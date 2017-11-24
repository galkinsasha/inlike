import { createAction , handleActions } from 'redux-actions'
import { Meteor } from 'meteor/meteor'
// ------------------------------------
// Constants
// ------------------------------------
export const NAMESPACE = 'user'
export const SET_ERROR = NAMESPACE+'/'+'SET_ERROR'
export const SET_USER = NAMESPACE+'/'+'SET_USER'
export const SET_USER_UID = NAMESPACE+'/'+'SET_USER_UID'
export const LOGOUT_USER = NAMESPACE+'/'+'LOGOUT_USER'



export const GET_INSTAGRAM_PHOTOS = NAMESPACE+'/'+'GET_INSTAGRAM_PHOTOS'

// ------------------------------------
// Actions
// ------------------------------------

export const setError = err => ({
    type: SET_ERROR,
    payload: err
})

export const setUser = id => ({
    type: SET_USER,
    payload: Meteor.users.findOne(id)
})

export const checkLoggedIn = () => ({
    type: SET_USER_UID
})


export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: Meteor.logout()
})

export const actions = {
    setError,
    setUser,
    checkLoggedIn,
    logoutUser
}

// ------------------------------------
// Reducers
// ------------------------------------

export default handleActions({
    [SET_ERROR] : (state, { payload }) => state.merge({...payload}),
    [SET_USER] : (state, { payload }) =>{
        return {...state, ...payload}
    },
    [SET_USER_UID] : (state) =>{
        return {...state, uid:Meteor.userId()}
    },
    [LOGOUT_USER] : (state) =>{
        return {}
    }

}, {})

