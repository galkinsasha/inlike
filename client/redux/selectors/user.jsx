import { createSelector } from 'reselect'
import { toJS } from 'immutable'

// ------------------------------------
// Combined-Selectors
// ------------------------------------



export const userSelector = state => ({
    ...uidSelector(state),
    ...userInfoSelector(state)
})

export const uidSelector = state => {
   return {
        uid: state.user_info.uid
   }
}

export const accessTokenSelector = state => {
    let info = state.user_info.services || {}
    info = info.hasOwnProperty('instagram') ? info.instagram : {}
    return info.hasOwnProperty('accessToken') ? info.accessToken : null
}

export const instagramIdSelector = state => {
    let info = state.user_info.services || {}
    info = info.hasOwnProperty('instagram') ? info.instagram : {}
    return {
        instagramId: info.hasOwnProperty('id') ? info.id : null
    }
}

export const userInfoSelector = state => {
    const info = state.user_info.services || {}
    return info.hasOwnProperty('instagram') ? info.instagram : {}
}

