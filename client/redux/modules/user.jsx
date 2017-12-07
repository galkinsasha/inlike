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
export const UPDATE_COUNT = NAMESPACE+'/'+'UPDATE_COUNT'
export const SET_TYPE = NAMESPACE+'/'+'SET_TYPE'
export const GET_TYPE = NAMESPACE+'/'+'GET_TYPE'

// ------------------------------------
// Actions
// ------------------------------------

export const setError = err => ({
    type: SET_ERROR,
    payload: err
})

export const updateCount = count => {
    return {
        type: UPDATE_COUNT,
        payload: Meteor.users.update({_id:Meteor.userId()}, { $set: {'profile.count':count} })
    }
}

export const setType = type => {
    Meteor.users.update({_id:Meteor.userId()}, { $set: {'profile.type':type} })
    return {
        type: SET_TYPE,
        payload: type
    }
}

export const getType = () => {
    return {
        type: GET_TYPE,
        payload: Meteor.user().profile.type || null
    }
}

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
    updateCount,
    setType,
    getType,
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
    },
    [UPDATE_COUNT] : (state, { payload }) =>{
        return state
    },
    [SET_TYPE] : (state, { payload }) =>{
        return { ...state, type:payload, error:null }
    },
    [GET_TYPE] : (state, { payload }) =>{
        return { ...state, type:payload }
    }

}, {})

