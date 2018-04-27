import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import configureStore from './redux/configureStore'
import App from './App'
import Policy from './Policy'
import './index.html';
import './scss/main.scss';

const store = configureStore();
if(Meteor.isClient){
    Meteor.startup(() => {
        ReactDOM.render(
            <Provider store={store}><Router>
                <Switch>
                    <Route exact path='/policy' component={Policy}/>
                    <Route exact path='' component={App}/>
                </Switch>
            </Router></Provider>,
            document.getElementById('root')
        )

        if (Meteor.isCordova) {
            if (AdMob) {
                AdMob.createBanner( {
                    adId: 'ca-app-pub-7071169496107297/2165337450',
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    adSize: 'SMART_BANNER',
                    isTesting: false,
                    autoShow: true,
                    success: function() {
                        console.log("Received ad");
                    },
                    error: function() {
                        console.log("No ad received");
                    }
                });
            } else {
                console.log("No Admob");
            }
        } else {
            console.log("No Cordova ");
        }
    });
}




