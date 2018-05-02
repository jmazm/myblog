import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import TagList from '../../components/TagList'
import ArticleList from '../../components/ArticleList'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'
import {actions as TagReducer} from '../../../../redux/reducer/tagReducer'

import { Pagination } from 'antd';


const {get_all_articles} = ArticleReducer
const {get_all_tags} = TagReducer

class Tag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }
  pageOnChange (page, pagesize) {
    const id = this.props.match.params.id
    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize,
      tag: id
    })
    this.setState({
      currentPage: page
    })
  }
  render () {
    const {articleList, total, tags} = this.props
    console.log(articleList)
    return (
      <div className="my-blog not-home-page">
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
              <TagList data={tags}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    const id = this.props.match.params.id
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 5,
      tag: id
    })
    this.props.get_all_tags()
  }

  componentDidUpdate (prevPros) {
    const preId = prevPros.match.params.id
    const curId = this.props.match.params.id
    if (curId && preId && preId !== curId) {
      console.log(preId, curId)
      this.props.get_all_articles({
        pageNum: 1,
        pageSize: 5,
        tag: curId
      })
    }
  }
}

// 设置默认值
Tag.defaultProps = {
  articleList: [],
  total: 0,
  tags: []
}

Tag.propTypes = {
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
)(Tag)