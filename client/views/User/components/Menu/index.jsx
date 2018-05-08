import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './style.css'

class AboutMe extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
          <div className="me-container">
            <div className="me-inner">
              <img className="me-avatar" src="../../../static/imgs/me.jpg"/>
              <ul className="contact-list clearfix">
                <li className="list-tiem">
                  <span className="fa fa-wechat"></span>
                  <span className="contact-img-wrapper">
                    <img className="contact-img" src="../../../static/imgs/wechat.jpg"/>
                  </span>
                </li>
                <li className="list-tiem">
                  <span className="fa fa-qq"></span>
                  <span className="contact-img-wrapper">
                    <img className="contact-img" src="../../../static/imgs/QQ.jpg"/>
                  </span>
                </li>
                <li className="list-tiem">
                  <a className="fa fa-github" href="https://github.com/JMHello/"></a>
                </li>
              </ul>
              <div className="date">
                日期：2018-03-23
              </div>
            </div>
          </div>
        )
    }
}

module.exports = AboutMe