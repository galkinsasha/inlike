import React, { Component } from 'react'
import '../scss/loggedin-layout.scss'
import '../scss/loggedout.scss';
import { connect } from 'react-redux'
import  { actions } from '../redux/modules/user'
import { Tracker } from 'meteor/tracker';
import Modal from './../components/Modal';
import Settings from './../components/SettingsContent';

import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem,
    Image
} from 'react-bootstrap';

class LoggedinLayout extends Component{
    render(){
        return<div id="loggedIn-layout">
            <Navbar inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src={this.props.profile_picture} circle />
                    </Navbar.Brand>
                    <Nav>
                        <NavDropdown eventKey={3} title={this.props.full_name || ''} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Профиль</MenuItem>
                            <MenuItem onClick = {this._showModalForm.bind(this)} eventKey={3.2}>Настройки</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick={this._logout.bind(this)}>Выход</MenuItem>
                        </NavDropdown>

                    </Nav>

                    <Navbar.Text>
                        MoreLess
                    </Navbar.Text>

                </Navbar.Header>
            </Navbar>
            <div id="loggedIn-content">{this.props.children}</div>
            <Modal
                //contentLabel={"edit_segment"}
                ref="modal"
                content = {<Settings callback={this._onCallback.bind(this)}/>}
                header = 'Налаштування'
            />
        </div>
    }
    _onCallback = (type) => this._closeModalForm()
    _logout = () => Tracker.autorun(this.props.logoutUser)
    _showModalForm = () => this.refs.modal.show()
    _closeModalForm = () => this.refs.modal.close()
}
const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = () => ({})
export default connect(mapStateToProps, mapDispatchToProps)(LoggedinLayout)