import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { actions as userActions } from '../redux/modules/user'
import { userCountSelector, userLangSelector } from '../redux/selectors/user'
import { mediaErrorSelector, mediaProcessingSelector, mediaErrorMoreSelector } from '../redux/selectors/media'
import { Glyphicon } from 'react-bootstrap'
import language from './../lng.json'


import Settings from './SettingsContent';
import Modal from './Modal';
import './../scss/gameover.scss';

class GameOverContent extends Component {

    constructor(props){
        super(props)
        this.state = {
            count:0,
            settingsChanged:false
        }
    }

    componentDidUpdate(){
        const { settingsChanged } = this.state
        const { error, errorMore, fetchingPhotos } = this.props
        if ( settingsChanged && !error && !fetchingPhotos ){
            this.hide()
        }else if(errorMore){
            this.show();
        }
    }

    shouldComponentUpdate(nextProps){
        const  count  = nextProps.bestCount
        const { bestCount } = this.props
        return count == bestCount && nextProps!=this.props
    }

    render() {
        const { errorMore } = this.props
        const { count } = this.state
        return <Modal
            ref="modal"
            content = {<div className="gameOver-wrapper">
                <div className="gameOver-results">
                    {this._getResults(count)}
                    {this._getBestResults(count)}
                </div>
                <Settings callback={this._onCallback.bind(this)}/>
            </div>}
            header = {errorMore ? 'what_is_next' : 'game_over' }
        />
    }

    _getResults = (count) => {
        const { errorMore, ln } = this.props
        return errorMore ? <div className="result small">{language[ln]['end_photo']}</div> : <div className="result">{ language[ln]['your_result'] }:{count}</div>
    }

    _getBestResults = (count) => {
        const {bestCount, updateCount, errorMore, ln} = this.props
        if(bestCount < count && !errorMore){
            updateCount(count)
            return <div className="best-result">
                <Glyphicon glyph="tower"/>
                <div className="title">{ language[ln]['best_result'] }</div>
            </div>

        }else{
            return null
        }
    }

    _onCallback = () => {
        this.setState({
            settingsChanged:true
        })
    }

    show = (count) => {
        this.setState({
            count
        },this.refs.modal.getWrappedInstance().show())
    }

    hide = () => {
        this.setState({
            settingsChanged:false
        },this.refs.modal.getWrappedInstance().close())
    }
}

const mapDispatchToProps = {
    ...userActions
}

const mapStateToProps = (state) => ({
    bestCount  : userCountSelector(state),
    error  : mediaErrorSelector(state),
    errorMore : mediaErrorMoreSelector(state),
    fetchingPhotos  : mediaProcessingSelector(state),
    ln  : userLangSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GameOverContent)