import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

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
            <img src="#" className="avatar"/>
          </a>
          <h1 className="header-ti"><a href="/">JMSpace</a></h1>
          <SearchBar/>
          <nav className="nav-bar">
            <ul className="nav-list clearfix">
              <li className="list-item"><Link to="/">首页</Link></li>
              <li className="list-item"><Link to="/category">博客分类</Link></li>
              <li className="list-item"><Link to="/tag">标签分类</Link></li>
              <li className="list-item"><Link to="/demo">DEMO</Link></li>
              <li className="list-item"><Link to="/me">关于我</Link></li>
              <li className="list-item"><Link to="/message">留言</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }

  componentDidMount () {
  }
  componentWillMount () {
  }
}

Header.defaultProps = {
}

Header.propTypes = {
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header)