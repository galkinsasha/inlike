import { combineReducers } from 'redux'
import user_info from './modules/user'
import media from './modules/media'

module.exports = combineReducers({
    user_info,
    media
})