import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import ArticleList from '../../components/ArticleList'
// import AboutMe from '../../components/AboutMe'
import TagList from '../../components/TagList'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'
import {actions as TagReducer} from '../../../../redux/reducer/tagReducer'

import { Pagination } from 'antd';

import './style.css'

const {get_all_articles} = ArticleReducer
const {get_all_tags} = TagReducer

class Home extends Component {
  constructor (props) {
    super(props)
  }
  pageOnChange (page, pagesize) {
    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize
    })
  }
  render () {
    const {articleList, total, tags} = this.props
    return (
      <div className="my-blog">
        <Header/>
        <SearchBar/>
        <div className="main">
          <div className="main-inner">
            <div className="content-inner">
              <ArticleList data={articleList}/>
              <div className="pagination-wrapper">
                <Pagination onChange={this.pageOnChange.bind(this)} defaultCurrent={1} total={parseInt(total)} defaultPageSize={5}/>
              </div>
            </div>
            <div className="side-bar">
              {/*<AboutMe/>*/}
              <TagList data={tags}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 5
    })
    this.props.get_all_tags()
  }
}

// 设置默认值
Home.defaultProps = {
  articleList: [],
  total: 0,
  tags: []
}

Home.propTypes = {
  articleList: PropTypes.array,
  total: PropTypes.number,
  tags: PropTypes.array
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles
  return {
    articleList,
    total,
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_articles: bindActionCreators(get_all_articles, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Home)