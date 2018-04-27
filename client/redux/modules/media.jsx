import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'media'
export const GET_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_INSTAGRAM_PHOTOS'
export const GET_MORE_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_MORE_INSTAGRAM_PHOTOS'
export const UPDATE_PHOTOS = NAMESPACE+'/'+'UPDATE_PHOTOS'
export const FAIL_PHOTOS = NAMESPACE+'/'+'FAIL_PHOTOS'
export const FAIL_MORE_PHOTOS = NAMESPACE+'/'+'FAIL_MORE_PHOTOS'
export const PROCESSING_PHOTOS = NAMESPACE+'/'+'PROCESSING_PHOTOS'
export const PROCESSING_MORE_PHOTOS = NAMESPACE+'/'+'PROCESSING_MORE_PHOTOS'

const TAGS = {
    art:['artbasel', 'artphoto'],
    pets:['animalphotos', 'wildanimal'],
    nature:['naturephoto'],
    cars:['carsandcoffee','cars','supercars','truckstar2017'],
    bikes:['motorbikephotography','motobike'],
    planet:['nationalgeographic','discover','planet']
}

// ------------------------------------
// Actions
// ------------------------------------

//we do not use accessToken - because we do not use instaApi
export const getMoreInstagramPhotos  = (accessToken, type, min_tag_id) => {
    return function (dispatch){
        dispatch({type:PROCESSING_MORE_PHOTOS, payload:true})
        const uri = getMediaUri(accessToken, type, min_tag_id)
        return fetch(uri, {
            method: 'GET'
        }).then((response) => {
            if(response.status == 200 && response.ok) {
                response.json().then((responseText) => {
                    const data = responseText.data.hashtag.edge_hashtag_to_media
                    const min_tag_id = data.hasOwnProperty('page_info') && data.page_info.has_next_page
                        ? data.page_info.end_cursor : null
                    if (data.hasOwnProperty('edges')) {
                        if (!_.isEmpty(data.edges) && data.edges.length >= 3) {
                            dispatch({
                                type: GET_INSTAGRAM_PHOTOS,
                                payload: {...data, min_tag_id: min_tag_id}
                            })
                        } else {
                            dispatch({type: FAIL_MORE_PHOTOS, payload: true})
                        }
                    } else {
                        dispatch({type: FAIL_MORE_PHOTOS, payload: true})
                    }

                })
            }else{
                dispatch({type:FAIL_PHOTOS, payload:true})
            }
        })
    }
}

export const getInstagramPhotos  = (accessToken, type) => {

        return function(dispatch) {
            if (type && !_.isEmpty(type)){
            dispatch({type:PROCESSING_PHOTOS, payload:true})
            const uri = getMediaUri(accessToken, type)
            return fetch(uri, {
                method: 'GET'
            }).then((response) => {
                if(response.status == 200 && response.ok){
                    response.json().then((responseText) => {
                        const data = responseText.data.hashtag.edge_hashtag_to_media
                        const min_tag_id = data.hasOwnProperty('page_info') && data.page_info.has_next_page
                            ? data.page_info.end_cursor : null
                        if(data.hasOwnProperty('edges')){
                            if(!_.isEmpty(data.edges) && data.edges.length>=3 && !min_tag_id){

                                dispatch({type:GET_INSTAGRAM_PHOTOS, payload:{...data, min_tag_id:min_tag_id}})

                            }else if(!_.isEmpty(data.edges) && data.edges.length>=3 && min_tag_id){
                                getMoreInstagramPhotos(accessToken, type, min_tag_id)(dispatch)

                            }else if((_.isEmpty(data.edges) || data.edges.length<4) && min_tag_id){
                                getMoreInstagramPhotos(accessToken, type, min_tag_id)(dispatch)

                            }else{
                                dispatch({type:FAIL_PHOTOS, payload:true})
                            }

                        }else{
                            dispatch({type:FAIL_PHOTOS, payload:true})
                        }
                    })
                }else{
                    dispatch({type:FAIL_PHOTOS, payload:true})
                }

            })}else{
                dispatch({type:FAIL_PHOTOS, payload:true})
            }
    }
}

export const correctAnswer  = () => {
    return function(dispatch,a) {
        dispatch({type:UPDATE_PHOTOS})
    }
}
export const actions = {
    getInstagramPhotos,
    getMoreInstagramPhotos,
    correctAnswer
}

// ------------------------------------
// Reducers
// ------------------------------------

export default function mediaReducer(state = {}, action) {
    switch(action.type) {
        case GET_INSTAGRAM_PHOTOS:
            let tmpState = _.clone(state)
            if (state.hasOwnProperty('data') && state.data.length<=1){
                tmpState.data.push(...action.payload.edges)
            }else{
                tmpState.data = action.payload.edges
            }
            return {...tmpState, min_tag_id:action.payload.min_tag_id, error:null, errorMore:null, processing:false, processingMore:false}
        case PROCESSING_PHOTOS:
            return {...state, processing:true, processingMore:false}

        case FAIL_PHOTOS:
            return {...state, error:action.payload, processing:false, processingMore:false}

        case FAIL_MORE_PHOTOS:
            return {...state, errorMore:true, processing:false, processingMore:false}

        case PROCESSING_MORE_PHOTOS:
            return {...state, processing:true, processingMore:true}

        case UPDATE_PHOTOS:
            let {data} = state
            data.shift()
            return{...state, data:_.clone(data)}
        default:
            return state;
    }
}

// ------------------------------------
// Helpers
// ------------------------------------

getMediaUri = (accessToken, tagType, min_tag_id=null) => {
    const tag = TAGS.hasOwnProperty(tagType) ?
        TAGS[tagType][Math.floor((Math.random() * TAGS[tagType].length))]
        : null
    const variables = {
        "tag_name":tag,
        "first":50
    }


    if(min_tag_id){
        Object.assign(variables, {
            "after":min_tag_id
        })
    }
    return tag
        ? 'https://www.instagram.com/graphql/query/?query_id=17886322183179102&variables='+JSON.stringify(variables)
        : 'https://api.instagram.com/v1/users/self/media/recent/'

}


getAuthorUri = (shortcode) => {

}

