import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

const getInstagramPhotosUrl    = 'https://api.instagram.com/v1/users/self/media/recent/'

// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'media'
export const GET_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_INSTAGRAM_PHOTOS'
export const UPDATE_PHOTOS = NAMESPACE+'/'+'UPDATE_PHOTOS'

// ------------------------------------
// Actions
// ------------------------------------

export const getInstagramPhotos  = (accessToken) => {
    return function(dispatch) {
        return fetch(getInstagramPhotosUrl+'?access_token='+accessToken+'&limit=2', {
            method: 'GET'
        }).then((response) => {
            response.json().then((responseText) => {
                dispatch({type:GET_INSTAGRAM_PHOTOS, payload:responseText})
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
        case UPDATE_PHOTOS:
            let arr = state
            arr.shift()
            return _.clone(arr)
        default:
            return state;
    }
}


