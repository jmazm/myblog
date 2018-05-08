import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {addClass, removeClass, on} from '../../../../lib/util'

import TagList from '../../components/TagList'
import CategoryList from '../../components/TagList'

import './style.css'

import {actions as CategoryReducer} from '../../../../redux/reducer/categoryReducer'
import {actions as TagReducer} from '../../../../redux/reducer/tagReducer'

const {get_all_tags} = TagReducer
const {get_all_categories} = CategoryReducer

class Header extends Component {
  constructor (props) {
    super(props)
  }
  switchArea () {

  }
  show (e) {

  }
  hide (e) {

  }
  handleClick () {

  }
  render () {
    const {tags, categories} = this.props
    return (
      <header className="blog-header">
        <div className="overlay"></div>
        <div className="header-inner">
          <a href="/" className="avatar-link">
            <img src="#" className="avatar"/>
          </a>
          <h1 className="header-ti"><a href="/">JMSpace</a></h1>
          <div className="menu-wrapper">
            <div className="switch-btn" ref={ele => this.switchBtn = ele}>
              <i className="fa fa-bars" ref={ele => this.faBars = ele}></i>
              <div className="tips hide" ref={ele => this.tips = ele}>
                <ul className="tips-list">
                  <li className="list-item" data-target="nav">菜单</li>
                  <li className="list-item" data-target="tag">标签</li>
                  <li className="list-item" data-target="category">分类</li>
                </ul>
              </div>
            </div>
            <div className="switch-area ">
              <div className="area-nav">
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
              </div>
              <div className="area-tag hide">
                <h2 className="area-ti">标签</h2>
                <TagList data={tags} type="tag"/>
              </div>
              <div className="area-category hide">
                <h2 className="area-ti">类别</h2>
                <CategoryList data={categories} type="category"/>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  componentDidMount () {
    this.props.get_all_tags()
    this.props.get_all_categories()
  }
  componentWillMount () {
    this.switchBtn = null
    this.tips = null
    this.faBars = null
  }
}

Header.defaultProps = {
  tags: [],
  categories: []
}

Header.propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array
}

function mapStateToProps (state) {
  return {
    categories: state.categories,
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_categories: bindActionCreators(get_all_categories, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header)