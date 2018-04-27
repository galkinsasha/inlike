import React, { Component } from 'react'
import '../scss/loggedout.scss';
import {connect} from 'react-redux'
import  { actions } from '../redux/modules/user'
import  { Meteor } from 'meteor/meteor'
import { Button } from 'react-bootstrap';


class Loggedout extends Component{
    render(){
        const playMarketButton = !Meteor.isCordova 
            ? <a href="https://play.google.com/store/apps/details?id=moreless.meteorapp.com"><img width="120px" src="google-play-badge.png" alt="Download at Play Market"/></a>
            : null
        return <div className="logged-out">
                <div><Button className="login-button" onClick={this.onClick.bind(this)}>Login with Facebook</Button></div>
                <div className="privacy">Simple game where you need to choose what Instagram image has more likes</div>
                {playMarketButton}
        </div>
    }
    onClick(){
        const {setError, checkLoggedIn} = this.props
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err, a){
            if (err) {
                setError(err)
            } else {
                checkLoggedIn()
            }
        });
        /*Meteor.loginWithInstagram({
            loginStyle: 'popup'
        },function (err) {
            if (err) {
                setError(err)
            } else {
                checkLoggedIn()
            }
        })*/
    }
}

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = (state) => ({
    user_info  : state
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout)

