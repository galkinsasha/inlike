import { createSelector } from 'reselect'
import { toJS } from 'immutable'

// ------------------------------------
// Combined-Selectors
// ------------------------------------


export const mediaSelector = state => {
    return state.media || {}
}

export const mediaErrorSelector = state => {
    return state.media.error_message || null
}

