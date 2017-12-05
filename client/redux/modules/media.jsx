import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'media'
export const GET_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_INSTAGRAM_PHOTOS'
export const UPDATE_PHOTOS = NAMESPACE+'/'+'UPDATE_PHOTOS'
export const FAIL_PHOTOS = NAMESPACE+'/'+'FAIL_PHOTOS'

const TAGS = {
    girls:['boobsout'],
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
        const uri = getUri(accessToken, type)
        return fetch(uri, {
            method: 'GET'
        }).then((response) => {
            response.json().then((responseText) => {
                if(responseText.hasOwnProperty('data') && responseText.data.length>=3){
                    dispatch({type:GET_INSTAGRAM_PHOTOS, payload:responseText})
                }else{
                    dispatch({type:FAIL_PHOTOS, payload:'Ой, не можу знайти фото'})
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
            return action.payload.data
        case FAIL_PHOTOS:
            return {...state, error:action.payload}
        case UPDATE_PHOTOS:
            let arr = state
            arr.shift()
            return _.clone(arr)
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


