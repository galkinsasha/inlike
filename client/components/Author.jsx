import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as authorActions } from '../redux/modules/author'
import { authorProcessingSelector, authorSelector, authorErrorSelector, followerSelector } from '../redux/selectors/author'
import Loader from './Loader';
import _ from 'lodash';
import '../scss/author.scss';

class Author extends Component {

    constructor(props){
        super(props)
        this.props = props
    }

    componentWillMount(){
        const { getAuthor, imageShortcode } = this.props
        getAuthor(imageShortcode)
    }

    render() {
        const { imageShortcode, author } = this.props
        const data = author[imageShortcode];
        if(data){
            return <div className="author">
                <a onClick={()=>{window.open(`https://instagram.com/p/${imageShortcode}`, '_system')}}><span key={imageShortcode}>{this._getFollowers(imageShortcode)}</span> <img src={data.profile_pic_url} /> <span>{data.username}</span></a>
            </div>
        }else{
            return <div className="author">
                <Loader type/>
            </div>
        }

    }

    _getFollowers = (imageShortcode) =>{
        const { followers } = this.props
        return followers && followers.hasOwnProperty(imageShortcode) && !_.isEmpty(followers[imageShortcode]) ? followers[imageShortcode].count : null
    }

}

const mapDispatchToProps = {
    ...authorActions
}

const mapStateToProps = (state) => ({
    fetching  : authorProcessingSelector(state),
    followers  : followerSelector(state),
    author  : authorSelector(state),
    error  : authorErrorSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Author)