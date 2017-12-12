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

export const mediaProcessingMoreSelector = state => {
    return state.media.processingMore || null
}

export const mediaMinTagIdSelector = state => {
    return state.media.min_tag_id || null
}
export const mediaErrorMoreSelector = state => {
    return state.media.errorMore || null
}



