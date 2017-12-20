import React, { Component } from 'react'
import '../scss/loggedout.scss';
import {connect} from 'react-redux'
import  { actions } from '../redux/modules/user'
import  { Meteor } from 'meteor/meteor'
import { Button } from 'react-bootstrap';


class Loggedout extends Component{
    render(){
        return <div className="logged-out">
                <div><Button className="login-button" onClick={this.onClick.bind(this)}>Login with Instagram</Button></div>
                <div><a className="privacy" href="/policy">Privacy policy</a></div>
        </div>
    }
    onClick(){
        const {setError, checkLoggedIn} = this.props

        Meteor.loginWithInstagram({
            loginStyle: 'popup'
        },function (err) {
            if (err) {
                setError(err)
            } else {
                checkLoggedIn()
            }
        })
    }
}

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = (state) => ({
    user_info  : state
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout)

