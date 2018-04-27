import { combineReducers } from 'redux'
import user_info from './modules/user'
import media from './modules/media'
import author from './modules/author'

module.exports = combineReducers({
    user_info,
    media,
    author
})