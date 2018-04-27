import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'author'
export const PROCESSING_AUTHOR = NAMESPACE+'/'+'PROCESSING_AUTHOR'
export const GET_AUTHOR = NAMESPACE+'/'+'GET_AUTHOR'
export const GET_SUBSCRIBERS = NAMESPACE+'/'+'GET_SUBSCRIBERS'
export const FAIL_AUTHOR = NAMESPACE+'/'+'GET_AUTHOR'

// ------------------------------------
// Helpers
// ------------------------------------

const getAuthorUri = shortcode => {
    return `https://www.instagram.com/p/${shortcode}/?__a=1`
}

const getSubscribersUri = username => {
    return `https://www.instagram.com/${username}/?__a=1`
}

// ------------------------------------
// Actions
// ------------------------------------
export const getSubscribers = (username, shortcode) => {
    return function(dispatch) {
        const uri = getSubscribersUri(username)
        return fetch(uri, {
            method: 'GET',
            async: true
        }).then((response) => {
            if(response.status == 200 && response.ok){
                response.json().then((responseText) => {
                    const sub = responseText.user.followed_by
                    const tmp = []
                    tmp[shortcode] = sub
                    dispatch({type:GET_SUBSCRIBERS, payload:tmp})
                })
            }
        })
    }
}

export const getAuthor = shortcode => {
    return function(dispatch) {
        dispatch({type:PROCESSING_AUTHOR, payload:true})
        const uri = getAuthorUri(shortcode)
        return fetch(uri, {
            method: 'GET',
            async: true
        }).then((response) => {
            if(response.status == 200 && response.ok){
                response.json().then((responseText) => {
                    const data = responseText.graphql.shortcode_media
                    if(data.hasOwnProperty('owner')){
                        const tmp = []
                        tmp[shortcode] = data.owner
                        dispatch({type:GET_AUTHOR, payload:tmp})
                        getSubscribers(data.owner.username, shortcode)(dispatch)
                    }else{
                        dispatch({type:FAIL_AUTHOR, payload:true})
                    }
                })
            }else{
                dispatch({type:FAIL_AUTHOR, payload:true})
            }
        })
    }
}

export const actions = {
    getAuthor,
    getSubscribers
}

// ------------------------------------
// Reducers
// ------------------------------------

export default function authorReducer(state = {}, action) {
    switch(action.type) {
        case GET_AUTHOR:
            let tmpState = _.clone(state)
            if (!state.hasOwnProperty('data') ||  state.data.length>1){
                tmpState.data = {}
            }
            tmpState.data = _.assign({}, tmpState.data, action.payload)
            return { ...tmpState, error:false, processing:false}
        case FAIL_AUTHOR:
            return { ...state, error:true, processing:false }

        case PROCESSING_AUTHOR:
            return { ...state, processing:true }

        case GET_SUBSCRIBERS:
            let tState = _.clone(state)
            if (!state.hasOwnProperty('followers') ||  state.followers.length>1){
                tState.followers = {}
            }
            tState.followers = _.assign({}, tState.followers, action.payload)
            return { ...tState, error:false, processing:false}
        default:
            return state;
    }
}



