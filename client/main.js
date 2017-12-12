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
    });
}




