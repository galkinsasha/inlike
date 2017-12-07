import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'media'
export const GET_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_INSTAGRAM_PHOTOS'
export const UPDATE_PHOTOS = NAMESPACE+'/'+'UPDATE_PHOTOS'
export const FAIL_PHOTOS = NAMESPACE+'/'+'FAIL_PHOTOS'
export const PROCESSING_PHOTOS = NAMESPACE+'/'+'PROCESSING_PHOTOS'

const TAGS = {
    girls:['олексійолександрович'],
    pets:['pets'],
    nature:['canary'],
    cars:['carsandcoffee'],
    bikes:['motorbikephotography'],
    planet:['planetphoto']
}

// ------------------------------------
// Actions
// ------------------------------------

export const getInstagramPhotos  = (accessToken, type) => {
    return function(dispatch) {
        dispatch({type:PROCESSING_PHOTOS, payload:true})
        const uri = getUri(accessToken, type)
        return fetch(uri, {
            method: 'GET'
        }).then((response) => {
            response.json().then((responseText) => {
                if(responseText.hasOwnProperty('data') && responseText.data.length>=3){
                    dispatch({type:GET_INSTAGRAM_PHOTOS, payload:responseText})
                }else{
                    dispatch({type:FAIL_PHOTOS, payload:'Ой, не можу знайти фото. Спробуйте іншій тег.'})
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
    correctAnswer
}

// ------------------------------------
// Reducers
// ------------------------------------

export default function mediaReducer(state = {}, action) {
    switch(action.type) {
        case GET_INSTAGRAM_PHOTOS:
            return {...state, data:action.payload.data, error:null, processing:false}
        case PROCESSING_PHOTOS:
            return {...state, data:action.payload.data, processing:true}
        case FAIL_PHOTOS:
            return {...state, error:action.payload, processing:false}
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

getUri = (accessToken, type) => {
    const tag = TAGS.hasOwnProperty(type) ? TAGS[type].join(',') : null
    const url = tag
        ? 'https://api.instagram.com/v1/tags/'+tag+'/media/recent/'
        : 'https://api.instagram.com/v1/users/self/media/recent/'


    return url+'?access_token='+accessToken
}


