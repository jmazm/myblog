import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SearchBar from '../SearchBar'

import './style.css'

class Header extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <header className="blog-header">
        <div className="overlay"></div>
        <div className="header-inner">
          <a href="/" className="avatar-link">
            <img src="/imgs/me3.jpg" className="avatar"/>
          </a>
          <h1 className="header-ti"><a href="/">JMSpace</a></h1>
          <SearchBar/>
          <nav className="nav-bar">
            <ul className="nav-list clearfix">
              <li className="list-item"><Link to="/">首页</Link></li>
              <li className="list-item"><Link to="/category">博客分类</Link></li>
              <li className="list-item"><Link to="/tag">标签分类</Link></li>
              {/*<li className="list-item"><Link to="/demo">DEMO</Link></li>*/}
              <li className="list-item"><Link to="https://jmhello.github.io/effects/demo/resume/v5/index.html" target="_blank">关于我</Link></li>
              {/*<li className="list-item"><Link to="/message">留言</Link></li>*/}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
  shouldComponentUpdate () {
    return false
  }
}

export default Header