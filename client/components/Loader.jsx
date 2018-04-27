import '../scss/loader.scss';
import React, { Component } from 'react'

class Loader extends Component {

    render() {
        const {type} = this.props
        if(type == 'circle'){
            return <div className="loader-wrapper"><div className="loader"></div></div>
        }else{
            return <div className="loader"><div className="bar"/></div>
        }

    }
}

Loader.defaultProps = {
    type:'circle'
}

export default Loader
