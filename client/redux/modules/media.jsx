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
export const ERROR_TEXT = 'Ой, не можу знайти фото. Спробуйте іншій тег.'
export const ERROR_MORE_TEXT = 'Здається у нас закінчились фото. Оберіть інший тег і ми продовжимо...'

const TAGS = {
    girls:['олексійолександрович'],
    pets:['morning'],
    nature:['tenerife'],
    cars:['carsandcoffee'],
    bikes:['motorbikephotography'],
    planet:['planetphoto']
}

// ------------------------------------
// Actions
// ------------------------------------

export const getMoreInstagramPhotos  = (accessToken, type, min_tag_id) => {
    return (dispatch) => {
        dispatch({type:PROCESSING_MORE_PHOTOS, payload:true})
        const uri = getUri(accessToken, type, min_tag_id)
        return fetch(uri, {
            method: 'GET'
        }).then((response) => {
            response.json().then((responseText) => {
                const min_tag_id = responseText.hasOwnProperty('pagination') && responseText.pagination.hasOwnProperty('min_tag_id')
                    ? responseText.pagination.min_tag_id : null
                if(responseText.hasOwnProperty('data')){
                    if(!_.isEmpty(responseText.data) && responseText.data.length>=3){
                        dispatch({type:GET_MORE_INSTAGRAM_PHOTOS, payload:{...responseText, min_tag_id:min_tag_id}})
                    }else{
                        dispatch({type:FAIL_MORE_PHOTOS, payload:ERROR_MORE_TEXT})
                    }
                }else{
                    dispatch({type:FAIL_MORE_PHOTOS, payload:ERROR_MORE_TEXT})
                }

            })
        })
    }
}

export const getInstagramPhotos  = (accessToken, type) => {
    return function(dispatch) {
        dispatch({type:PROCESSING_PHOTOS, payload:true})
        const uri = getUri(accessToken, type)
        return fetch(uri, {
            method: 'GET'
        }).then((response) => {
            response.json().then((responseText) => {
                const min_tag_id = responseText.hasOwnProperty('pagination') && responseText.pagination.hasOwnProperty('min_tag_id')
                ? responseText.pagination.min_tag_id : null
                if(responseText.hasOwnProperty('data')){
                    if(!_.isEmpty(responseText.data) && responseText.data.length>=3){

                        dispatch({type:GET_INSTAGRAM_PHOTOS, payload:{...responseText, min_tag_id:min_tag_id}})

                    }else if((_.isEmpty(responseText.data) || responseText.data.length<4) && min_tag_id){

                        getMoreInstagramPhotos(accessToken, type, min_tag_id)(dispatch)

                    }else{
                        dispatch({type:FAIL_PHOTOS, payload:ERROR_TEXT})
                    }

                }else{
                    dispatch({type:FAIL_PHOTOS, payload:ERROR_TEXT})
                }

            })
        })
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
                tmpState.data.push(...action.payload.data)
            }else{
                tmpState.data = action.payload.data
            }
            return {...tmpState, min_tag_id:action.payload.min_tag_id, error:null, errorMore:null, processing:false, processingMore:false}
        case PROCESSING_PHOTOS:
            return {...state, processing:true, processingMore:false}

        case FAIL_PHOTOS:
            return {...state, error:action.payload, processing:false, processingMore:false}

        case FAIL_MORE_PHOTOS:
            return {...state, errorMore:action.payload, processing:false, processingMore:false}

        case PROCESSING_MORE_PHOTOS:
            return {...state, processing:false, processingMore:true}

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

getUri = (accessToken, tagType, min_tag_id=null) => {
    const tag = TAGS.hasOwnProperty(tagType) ? TAGS[tagType].join(',') : null
    const url = tag
        ? 'https://api.instagram.com/v1/tags/'+tag+'/media/recent/'
        : 'https://api.instagram.com/v1/users/self/media/recent/'

    const minTagId = min_tag_id ? '&min_tag_id=' + min_tag_id : ''

    return url+'?access_token=' + accessToken + minTagId
}


