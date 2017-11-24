import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import  { actions as mediaActions } from '../redux/modules/media'
import { userSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import Layout from '../layouts/LoggedinLayout';
import Loader from './Loader';
import Media from './Media';

class Loggedin extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.userData.id !== this.props.userData.id
    }

    componentDidMount() {
        const {setUser, uid} = this.props
        Tracker.autorun(setUser.bind(null, uid))
    }


    render() {
        const {userData} = this.props
        console.log(userData);
        return <Layout { ...userData }>
            {this._getContent(userData.id)}
        </Layout>
    }

    _getContent = (id) => {
        if (id) {
            return <Media/>
        } else {
            return <Loader/>
        }
    }

    _getPhotos = (userInstagramId,accessToken) => {
        this.props.getInstagramPhotos(userInstagramId, accessToken)

    }
}

const mapDispatchToProps = {
    ...userActions
}

const mapStateToProps = (state) => ({
    userData  : userSelector(state),
    media  : userSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedin)