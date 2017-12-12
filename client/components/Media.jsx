import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as mediaActions } from '../redux/modules/media'
import  { actions as userActions } from '../redux/modules/user'
import Settings from './SettingsContent';
import Modal from './Modal';
import {
    mediaSelector,
    mediaErrorSelector,
    mediaProcessingSelector,
    mediaProcessingMoreSelector,
    mediaMinTagIdSelector,
    mediaErrorMoreSelector
} from '../redux/selectors/media'
import { accessTokenSelector, userMatchTypeSelector } from '../redux/selectors/user'
import { Tracker } from 'meteor/tracker';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import GameOverContent from './GameOverContent';
import _ from 'lodash';
import Slider from 'react-slick';

class Loggedin extends Component {
    constructor(props){
        super(props)
        this.state = {
            count:0,
            answer:''
        }
    }

    componentWillMount() {
        const { accessToken, matchType, getInstagramPhotos, getType } = this.props
        getType()
        getInstagramPhotos(accessToken, matchType)
    }

    shouldComponentUpdate = props => !props.error && !props.fetchingPhotos

    render() {
        const { media, fetchingPhotos, fetchingMorePhotos} = this.props;
        if((!_.isEmpty(media) && !fetchingPhotos) || fetchingMorePhotos){
            return <div className="content" id={this.state.count}>
                {this._getSlider()}
                <div className="counter">Вгадано: {this.state.count}</div>
                <div className="info-wrapper">
                    <div></div>
                    <div className="likes">{media[0].likes.count}</div>
                    <div className={`vs ${this.state.answer}` }/>
                    {this._getButtons()}
                    <div></div>
                </div>
                { this._getGameOver() }
                </div>
        }else if(_.isEmpty(media) && fetchingPhotos){
            return <Loader/>
        }else{
            return <Modal
                ref="modal"
                content = {<Settings/>}
                header = 'Налаштування'
                show={true}
            />
        }
    }
    _getGameOver = () => <GameOverContent currCount = {this.state.count} ref='game_over'/>

    _getButtons = () => this.props.fetchingMorePhotos || this.props.errorMore
        ?   <div className="buttons"/>
        :   <div className="buttons">
                <Button onClick={this._checkClick.bind(this, 1)}>більше</Button>
                <Button onClick={this._checkClick.bind(this, 0)}>менше</Button>
            </div>

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
            swipe:false,
            responsive:[
                {   breakpoint: 768,
                    settings: {
                        vertical:true
                    }
                }
            ]

        }
        return <Slider key={media.length} {...settings} ref={c => this.slider = c } >
            <div className="slide" key={media[0].id}>
                <div className="images" key={media[0].id} style={style(media[0].images.standard_resolution.url)}></div>
            </div>
            {this._getLastSlide(media, 1)}
            {this._getLastSlide(media, 2)}

        </Slider>
    }

    _getLastSlide = (media, i) =>{
        const style = (imgUrl) => ({
            backgroundImage: 'url(' + imgUrl + ')',
        })
        if(media[i] ){
            return <div className="slide" key={media[i].id}>
                <div className="images" key={media[i].id} style={style(media[i].images.standard_resolution.url)}></div>
            </div>
        }else{
            return <div className="slide loading" key={_.uniqueId('loading_')}>
                <Loader/>
            </div>
        }
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

        if(media.length<=2){
            const { accessToken, matchType, getMoreInstagramPhotos, minTagId } = this.props
                getMoreInstagramPhotos(accessToken, matchType, minTagId)
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
        const { count } = this.state
        setTimeout(()=>{
            this.setState({
                answer:'',
                count:0
            },this.refs.game_over.getWrappedInstance().show(count))
        },601)
    }
}

const mapDispatchToProps = {
    ...mediaActions,
    ...userActions
}

const mapStateToProps = (state) => ({
    accessToken  : accessTokenSelector(state),
    media : mediaSelector(state),
    error : mediaErrorSelector(state),
    errorMore : mediaErrorMoreSelector(state),
    matchType : userMatchTypeSelector(state),
    fetchingPhotos : mediaProcessingSelector(state),
    fetchingMorePhotos : mediaProcessingMoreSelector(state),
    minTagId : mediaMinTagIdSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedin)