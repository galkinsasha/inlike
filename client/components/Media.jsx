import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as mediaActions } from '../redux/modules/media'
import { mediaSelector, mediaErrorSelector } from '../redux/selectors/media'
import { accessTokenSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import _ from 'lodash';

class Loggedin extends Component {
    constructor(props){
        super()
        this.state = {
            count:0
        }
    }

    componentDidMount() {
        const { accessToken, getInstagramPhotos } = this.props
        getInstagramPhotos(accessToken)
    }
    render() {
        //console.log(this.props);
        const {media, error} = this.props;
        console.log(media);
        if(error){
            return error
        }else if(!_.isEmpty(media)){
            const style = (imgUrl) => ({
                backgroundImage: 'url(' + imgUrl + ')',
            });
            return <div className="content">

                        <div className="images" key={media[0].id} style={style(media[0].images.standard_resolution.url)}>
                            <div className="likes">{media[0].likes.count}</div>
                            <div className="counter">Вгадано: {this.state.count}</div>
                        </div>
                        <div className="images" key={media[1].id} style={style(media[1].images.standard_resolution.url)}>
                            <div className="buttons">
                                <Button onClick={this._checkClick.bind(this, 1)}>більше</Button>
                                <Button onClick={this._checkClick.bind(this, 0)}>меньше</Button>
                            </div>
                        </div>
                <div className="vs">VS</div>
                </div>
        }else{
            return <Loader/>
        }
    }

    _checkClick = (more) => {
        const {media} = this.props
        const { count } = this.state
        if (more) {
            if(media[1].likes.count >= media[0].likes.count){
                this.props.correctAnswer()
                this.setState({
                    count:count+1
                })
            }else{
                this.wrongAnswer()
            }
        } else {
            if(media[1].likes.count <= media[0].likes.count){
                this.props.correctAnswer()
                this.setState({
                    count:count+1
                })
            }else{
                this.wrongAnswer()
            }
        }
    }

    wrongAnswer(){
        alert('wrong')
    }
}

const mapDispatchToProps = {
    ...mediaActions
}

const mapStateToProps = (state) => ({
    accessToken  : accessTokenSelector(state),
    media : mediaSelector(state),
    error : mediaErrorSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedin)