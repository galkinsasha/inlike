import React, { Component } from 'react'
import '../scss/menu.scss'
import '../scss/loggedout.scss';
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import  { actions as mediaActions } from '../redux/modules/media'
import  { mediaErrorSelector, mediaSelector,mediaProcessingSelector } from '../redux/selectors/media'
import  { userLangSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import Modal from './../components/Modal';
import Settings from './../components/SettingsContent'
import { browserHistory } from 'react-router'
import language from './../lng.json';
import { elastic as Menu } from 'react-burger-menu'


class LoggedinLayout extends Component{
    constructor(props){
        super()
        this.state = {
            menuOpen:false
        }
    }
    componentDidUpdate(){
        const {error, fetching} = this.props
        if(!error && !fetching){
            this._closeModalForm()
        }
    }
    render(){
        const {ln} = this.props
        const lang = language[ln]
        return<div id="loggedIn-layout">
            <div id="outer-container">
                <Menu isOpen={this.state.menuOpen} onStateChange={ this._isMenuOpen.bind(this) } elastic outerContainerId={ "outer-container" }>
                    <div className="app-title">MoreLess</div>
                    <span className="menu-item" id="settings" onClick = {this._showModalForm.bind(this)} >{lang.settings}</span>
                    <span className="menu-item" id="lang" onClick = {this._switchLang.bind(this)}>Eng/Рус</span>
                    <hr/>
                    <span id="logout" onClick={this._logout.bind(this)} className="menu-item" href="">{lang.exit}</span>
                </Menu>
            </div>
            <div id="loggedIn-content">{this.props.children}</div>
            <Modal
                ref="modal"
                content = {<Settings callback={this._closeMenu.bind(this)}/>}
                header = {'settings'}
            />
        </div>
    }
    _isMenuOpen = state => {
        this.setState({
            menuOpen:state.isOpen
        })
    }
    _closeMenu = () => {
        this.setState({
            menuOpen:false
        })
    }
    _goToPolicy = () => window.location.href = '/policy'
    _logout = () => Tracker.autorun(this.props.logoutUser)
    _showModalForm = () => this.refs.modal.getWrappedInstance().show()
    _closeModalForm = () => this.refs.modal.getWrappedInstance().close()
    _switchLang = () => {
        const { ln } = this.props
        const l = ln == 'ru' ? 'en' : 'ru'
        this.props.setLang(l)
    }
}

const mapDispatchToProps = {
    ...mediaActions,
    ...userActions
}

const mapStateToProps = (state) => ({
    error : mediaErrorSelector(state),
    media : mediaSelector(state),
    ln : userLangSelector(state),
    fetching : mediaProcessingSelector(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoggedinLayout)