import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as mediaActions } from '../redux/modules/media'
import { mediaSelector, mediaErrorSelector } from '../redux/selectors/media'
import { accessTokenSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import _ from 'lodash';
import Slider from 'react-slick'

class Loggedin extends Component {
    constructor(props){
        super(props)
        this.state = {
            count:0,
            answer:''
        }
    }

    componentDidMount() {
        const { accessToken, getInstagramPhotos } = this.props
        getInstagramPhotos(accessToken)
    }
    render() {
        const {media, error} = this.props;
        if(error){
            return error
        }else if(!_.isEmpty(media)){
            return <div className="content" id={this.state.count}>
                {this._getSlider()}
                <div className="counter">Вгадано: {this.state.count}</div>
                <div className="info-wrapper">
                    <div></div>
                    <div className="likes">{media[0].likes.count}</div>
                    <div className={`vs ${this.state.answer}` }/>
                    <div className="buttons">
                        <Button onClick={this._checkClick.bind(this, 1)}>більше</Button>
                        <Button onClick={this._checkClick.bind(this, 0)}>менше</Button>
                    </div>
                    <div></div>
                </div>
                </div>
        }else{
            return <Loader/>
        }
    }

    _getSlider = () => {
        const style = (imgUrl) => ({
            backgroundImage: 'url(' + imgUrl + ')',
        })
        const {media} = this.props
        const settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 2,
            slidesToScroll: 1,
            accessibility:false,
            arrows:false,
            swipe:true,
            responsive:[
                { breakpoint: 768, settings: {

                    vertical:true

                }}
            ]

        }
        return <Slider key={media.length} {...settings} ref={c => this.slider = c } >
            <div className="slide" key={media[0].id}>
                <div className="images" key={media[0].id} style={style(media[0].images.standard_resolution.url)}></div>
            </div>
            <div className="slide" key={media[1].id}>
                <div className="images" key={media[1].id} style={style(media[1].images.standard_resolution.url)}></div>
            </div>
            <div className="slide" key={media[2].id}>
                <div className="images" key={media[2].id} style={style(media[2].images.standard_resolution.url)}></div>
            </div>
        </Slider>
    }

    _checkClick = (more) => {
        const {media} = this.props
        const { count } = this.state
        if (more) {
            if(media[1].likes.count >= media[0].likes.count){
                this.setState({
                    answer:'correct',
                    count:count+1
                },this._onSuccess.bind(this))
            }else{
                this.setState({
                    answer:'fail'
                },this._onFail.bind(this))
            }
        } else {
            if(media[1].likes.count <= media[0].likes.count){
                this.setState({
                    answer:'correct',
                    count:count+1
                },this._onSuccess.bind(this))
            }else{
                this.setState({
                    answer:'fail'
                },this._onFail.bind(this))
            }
        }
    }
    _onSuccess = () => {
        this.slider.slickNext()
        setTimeout(()=>{
            this.setState({
                answer:''
            },this.props.correctAnswer())
        },601)

    }

    _onFail(){
        //alert('wrong')
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