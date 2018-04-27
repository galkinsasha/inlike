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
    info = info.hasOwnProperty('facebook') ? info.facebook : {}
    return info.hasOwnProperty('accessToken') ? info.accessToken : null
}

export const instagramIdSelector = state => {
    let info = state.user_info.services || {}
    info = info.hasOwnProperty('facebook') ? info.facebook : {}
    return {
        instagramId: info.hasOwnProperty('id') ? info.id : null
    }
}

export const userInfoSelector = state => {
    const info = state.user_info.services || {}
    return info.hasOwnProperty('facebook') ? info.facebook : {}
}
export const userMatchTypeSelector = state => {
    const profile = state.user_info.profile || {}
    return profile.hasOwnProperty('type') ? profile.type : {}
}

export const userCountSelector = state => {
    const profile = state.user_info.profile || {}
    return profile.hasOwnProperty('count') ? profile.count : 0
}

export const userLangSelector = state => {
    const profile = state.user_info || {}
    return profile.hasOwnProperty('lang') ? profile.lang : 'ru'
}

