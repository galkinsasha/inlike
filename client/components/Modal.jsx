import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import _ from 'lodash'
import './../scss/modal.scss'


export default class ModalDialog extends Component {

    static propTypes = {
        content: PropTypes.element.isRequired,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                type:PropTypes.oneOf(['confirm','cancel']).isRequired,
                title:PropTypes.string.isRequired,
                callback:PropTypes.func.isRequired,
                disabled:PropTypes.bool
            }).isRequired
        ),
        header:PropTypes.string
    };

    constructor(props) {
        super(props)
        this.state = {
            show:false
        }
    }

    render() {
        const   content = this._getContent(),
                header = this._getHeader(),
                footer = this._getFooter()
        return (
            <Modal show={this.state.show} onHide={this.close} backdrop={true}>
                {header}
                {content}
                {footer}
            </Modal>
        );
    }
    
    _getHeader = () => {
        let { header } = this.props
        return header ? <Modal.Header>
                <h4>{ header }</h4>
            </Modal.Header> : null
    }

    _getContent = () => {
        let { content } = this.props
        return content ? <Modal.Body>
                {content}
        </Modal.Body> : null
    }

    _getFooter = () => {
        let { buttons } = this.props
        const mapStyle = {
            confirm: "primary",
            cancel:"default"
        }

        let buts = _.map(buttons, button=>{
            let { type, title, callback } = button
            return <Button disabled={button.disabled || false} key={type} onClick = {callback.bind(null)} className={type=='cancel' ? 'btn-secondary': ''} bsStyle={mapStyle[type] || "default"}>{title}</Button>
        })
        return !_.isEmpty(buts) ? <Modal.Footer>
                {buts}
            </Modal.Footer> : null 
    }



    close = () => {
        if(this.state.hasOwnProperty('onClose') && typeof this.state.onClose === 'function'){
            this.state.onClose();
            this.setState({
                onClose:null
            });
            return false;
        }
        this.setState({
            type:null,
            show:false
        });
    }

    show = () => {
        this.setState({
            show:true
        })
    }

}
