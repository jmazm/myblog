import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'

import './style.css'

class Header extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
          <header className="header">
              <a href="/" className="header-link"><h1 className="header-ti">JMSpace</h1></a>
              <nav className="nav-bar">
                  <ul className="nav-list clearfix">
                      <li className="list-item"><Link to="/">首页</Link></li>
                      <li className="list-item"><Link to="/category/1/article">博客分类</Link></li>
                      <li className="list-item"><Link to="/tag/1/article">标签分类</Link></li>
                      <li className="list-item"><Link to="/demo">DEMO</Link></li>
                      <li className="list-item"><Link to="/me">关于我</Link></li>
                      <li className="list-item"><Link to="/message">留言</Link></li>
                  </ul>
              </nav>
          </header>
        )
    }
}

module.exports = Header