import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as mediaActions } from '../redux/modules/media'
import  { actions as userActions } from '../redux/modules/user'
import { mediaSelector, mediaErrorSelector } from '../redux/selectors/media'
import { accessTokenSelector, userMatchTypeSelector } from '../redux/selectors/user'
import Settings from './SettingsContent';
import { Tracker } from 'meteor/tracker';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import _ from 'lodash';
import Slider from 'react-slick';
import Modal from './Modal';


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

    componentDidUpdate(props) {
        const { accessToken, matchType, getInstagramPhotos } = props
        if(matchType!==this.props.matchType){
            getInstagramPhotos(accessToken, this.props.matchType)
        }
    }

    render() {
        const {media, error} = this.props;
        if(error){
            return <div className="media-error">
                {error}
                <h4>спробуйте інший тег</h4>
                <Settings/>
            </div>
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
                <Modal
                    ref="modal"
                    content = {<Settings/>}
                    header = 'Гру завершено'
                />
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
            swipe:false,
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

        setTimeout(()=>{
            this.setState({
                answer:'',
                count:0
            },this._showModalForm())
        },601)
    }

    _showModalForm = () => this.refs.modal.show()
    _closeModalForm = () => this.refs.modal.close()
}

const mapDispatchToProps = {
    ...mediaActions,
    ...userActions
}

const mapStateToProps = (state) => ({
    accessToken  : accessTokenSelector(state),
    media : mediaSelector(state),
    error : mediaErrorSelector(state),
    matchType : userMatchTypeSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Loggedin)