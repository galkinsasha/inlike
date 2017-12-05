import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import { userSelector, userMatchTypeSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import './../scss/settings.scss'

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
        return <div className="settings-wrapper">
            <div className={this._isActive('girls')} onClick={this._onClick.bind(this, 'girls')}><i className="fa fa-venus-mars"/></div>
            <div className={this._isActive('cars')} onClick={this._onClick.bind(this, 'cars')}><i className="fa fa-car"/></div>
            <div className={this._isActive('bikes')} onClick={this._onClick.bind(this, 'bikes')}><i className="fa fa-motorcycle"/></div>
            <div className={this._isActive('pets')} onClick={this._onClick.bind(this, 'pets')}><i className="fa fa-paw"/></div>
            <div className={this._isActive('planet')} onClick={this._onClick.bind(this, 'planet')}><i className="fa fa-globe"/></div>
            <div className={this._isActive('nature')} onClick={this._onClick.bind(this, 'nature')}><i className="fa fa-pagelines"/></div>
        </div>
    }

    _isActive = value => 'item '+((value===this.state.selected) ? 'active' : '')

    _onClick = (type) => {
        this.setState({selected  : type})
        this.props.setType(type)
        if(this.props.hasOwnProperty('callback')){
            this.props.callback(type);
        }
    }
}

const mapDispatchToProps = {
    ...userActions
}

const mapStateToProps = (state) => ({
    userData  : userSelector(state),
    matchType  : userMatchTypeSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)