import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import {HashRouter as Router, Route, hashHistory } from 'react-router-dom'
import configureStore from './redux/configureStore'
import App from './App'
import './index.html';
import './scss/main.scss';

const store = configureStore();
/*var a = prompt('number'), summ = 0;
for(var i=1; i<=a; i++){
    summ=summ+i;
}
console.log(summ);*/

if(Meteor.isClient){
    Meteor.startup(() => {
        ReactDOM.render(
            <Provider store={store}><App/></Provider>,
            document.getElementById('root')
        )
    });
}




