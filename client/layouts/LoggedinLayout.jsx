import React, { Component } from 'react'
import '../scss/loggedin-layout.scss'
import '../scss/loggedout.scss';
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import  { actions as mediaActions } from '../redux/modules/media'
import  { mediaErrorSelector, mediaSelector } from '../redux/selectors/media'
import  { userLangSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import Modal from './../components/Modal';
import Settings from './../components/SettingsContent'
import { browserHistory } from 'react-router'
import language from './../lng.json';

import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem,
    Image
} from 'react-bootstrap';

class LoggedinLayout extends Component{

    componentDidUpdate(){
        const {error} = this.props
        if(!error){
            this._closeModalForm()
        }
    }
    render(){
        const {ln} = this.props;
        const lang = language[ln]
        return<div id="loggedIn-layout">
            <Navbar inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src={this.props.profile_picture} circle />
                    </Navbar.Brand>
                    <Nav>
                        <NavDropdown eventKey={3} title={this.props.full_name || ''} id="basic-nav-dropdown">
                            <MenuItem onClick = {this._showModalForm.bind(this)} eventKey={3.1}>{lang.settings}</MenuItem>
                            <MenuItem eventKey={3.2} onClick = {this._goToPolicy.bind(this)}>{lang.privacy_policy}</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>
                                <span onClick = {this._switchLang.bind(this, 'en')} key={4.1}>Eng</span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                                <span onClick = {this._switchLang.bind(this, 'ru')} key={4.2}>Рус</span>
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick={this._logout.bind(this)}>{lang.exit}</MenuItem>
                        </NavDropdown>

                    </Nav>

                    <Navbar.Text>
                        MoreLess
                    </Navbar.Text>

                </Navbar.Header>
            </Navbar>
            <div id="loggedIn-content">{this.props.children}</div>
            <Modal
                ref="modal"
                content = {<Settings/>}
                header = {'settings'}
            />
        </div>
    }
    _goToPolicy = () => window.location.href = '/policy'
    _logout = () => Tracker.autorun(this.props.logoutUser)
    _showModalForm = () => this.refs.modal.getWrappedInstance().show()
    _closeModalForm = () => this.refs.modal.getWrappedInstance().close()
    _switchLang = (l) => this.props.setLang(l)
}

const mapDispatchToProps = {
    ...mediaActions,
    ...userActions
}

const mapStateToProps = (state) => ({
    error : mediaErrorSelector(state),
    media : mediaSelector(state),
    ln : userLangSelector(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoggedinLayout)