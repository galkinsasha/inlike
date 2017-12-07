import { createSelector } from 'reselect'
import { toJS } from 'immutable'

// ------------------------------------
// Combined-Selectors
// ------------------------------------


export const mediaSelector = state => {
    return state.media.data || {}
}

export const mediaErrorSelector = state => {
    return state.media.error || null
}

export const mediaProcessingSelector = state => {
    return state.media.processing || null
}

