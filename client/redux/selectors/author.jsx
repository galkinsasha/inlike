import { createSelector } from 'reselect'


// ------------------------------------
// Combined-Selectors
// ------------------------------------


export const authorSelector = state => {
    return state.author.data || {}
}

export const followerSelector = state => {
    return state.author.followers || {}
}

export const authorErrorSelector = state => {
    return state.author.error || null
}

export const authorProcessingSelector = state => {
    return state.author.processing || null
}




