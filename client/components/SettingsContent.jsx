import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import  { actions as mediaActions } from '../redux/modules/media'
import  Loader from './Loader'
import { userSelector, userMatchTypeSelector, accessTokenSelector, userLangSelector } from '../redux/selectors/user'
import { mediaErrorSelector, mediaProcessingSelector} from '../redux/selectors/media'
import { Tracker } from 'meteor/tracker'
import PropTypes from 'prop-types'
import './../scss/settings.scss'
import language from './../lng.json';


class Settings extends Component {

    static propTypes = {
        callback:PropTypes.func
    };

    constructor(props){
        super(props)
        this.state = {
            selected:props.matchType
        }
    }

    render() {
        return <div>
                <div className="settings-wrapper">
                    <div className={this._isActive('art')} onClick={this._onClick.bind(this, 'art')}><i className="fa fa-picture-o"/></div>
                    <div className={this._isActive('cars')} onClick={this._onClick.bind(this, 'cars')}><i className="fa fa-car"/></div>
                    <div className={this._isActive('bikes')} onClick={this._onClick.bind(this, 'bikes')}><i className="fa fa-motorcycle"/></div>
                    <div className={this._isActive('pets')} onClick={this._onClick.bind(this, 'pets')}><i className="fa fa-paw"/></div>
                    <div className={this._isActive('planet')} onClick={this._onClick.bind(this, 'planet')}><i className="fa fa-globe"/></div>
                    <div className={this._isActive('nature')} onClick={this._onClick.bind(this, 'nature')}><i className="fa fa-pagelines"/></div>
                </div>
            <div className="settings-error">
                {this._getError()}
                {this._getLoader()}
            </div>

            </div>
    }

    _isActive = value => 'item '+((value===this.state.selected) ? 'active' : '')

    _onClick = (type) => {
        const { accessToken, getInstagramPhotos } = this.props
        getInstagramPhotos(accessToken, type)
        this.setState({selected  : type})
        this.props.setType(type)
        if(this.props.hasOwnProperty('callback')){
            this.props.callback();
        }
    }
    _getLoader = () => this.props.fetchingPhotos ? <Loader type="bar"/> : null
    _getError = () => {
        const {ln} = this.props
        return !this.props.fetchingPhotos && this.props.error ? language[ln]['cant_find_photo'] : null
    }
}

Settings.defaultProps = {
    error: true,
    fetchingPhotos:true
};

const mapDispatchToProps = {
    ...userActions,
    ...mediaActions
}

const mapStateToProps = (state) => ({
    userData: userSelector(state),
    matchType: userMatchTypeSelector(state),
    accessToken: accessTokenSelector(state),
    error: mediaErrorSelector(state),
    fetchingPhotos  : mediaProcessingSelector(state),
    ln  : userLangSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)