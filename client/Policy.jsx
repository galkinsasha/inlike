import React, { Component } from 'react'
import _ from 'lodash'
import policy from './policy.json'
import './scss/policy.scss'
class Policy extends Component{
    constructor(props){
        super(props)
        this.state = {
            lang:'ru'
        }
    }
    render(){
        return <div className="policy-wrapper">
            <div className="close"><a href="/">Close</a></div>
            <div className="lang"><a onClick={this._switchLang.bind(this, 'ru')} href="#">RU</a>|<a onClick={this._switchLang.bind(this, 'en')} href="#">EN</a></div>
            {_.map(policy[this.state.lang], (content,title) => {
                return <div className="policy-item" key={_.uniqueId("policy_")}>
                    <h2>{'- '+title}</h2>
                    {content}
                    <hr/>
                </div>
            })}
        </div>
    }

    _switchLang = (l) => this.setState({lang:l})
}

export default Policy
