import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'

import { Pagination } from 'antd';

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import ArticleItem from '../../components/ArticleItem'

import './style.css'

const {get_all_articles} = ArticleReducer

class AdminArticle extends Component {
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
    const {articleList, total} = this.props
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理文章"/>
          <div className="content-inner">
            <div className="article-management-wrapper">
              {
                articleList.length > 0 ?
                  articleList.map((item, i) => {
                    return <ArticleItem data={item} key={i}/>
                  }) :
                  <div>暂无文章！</div>
              }
            </div>
            <div className="pagination-wrapper">
              <Pagination onChange={this.pageOnChange.bind(this)} defaultCurrent={1} total={parseInt(total)} defaultPageSize={15}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 15
    })
  }
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles
  return {
    articleList,
    total
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_articles: bindActionCreators(get_all_articles, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminArticle)