import React, { Component } from 'react'
import Loggedin from './components/Loggedin'
import Loggedout from './components/Loggedout'
import {connect} from 'react-redux'
import { uidSelector } from './redux/selectors/user'
import { actions } from './redux/modules/user'



class App extends Component{
    componentDidMount(){
        this.props.checkLoggedIn()
    }
    render(){
        if (this.props.uid){
            return <Loggedin uid={this.props.uid}/>
        }else{
            return <Loggedout/>
        }
    };
}

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = (state) => ({
    ...uidSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
