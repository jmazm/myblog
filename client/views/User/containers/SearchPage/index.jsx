import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import dateformat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'

import { Pagination } from 'antd';


const {get_all_articles} = ArticleReducer

class ArticleListByCategory extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

    this.state = {
      currentPage: 1
    }

    this.pageOnChange = this.pageOnChange.bind(this)
  }
  pageOnChange (page, pagesize) {
    const title = decodeURIComponent(this.props.match.params.title)

    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize,
      title: title
    })

    this.setState({
      currentPage: page
    })
  }
  render () {
    const {articleList, total} = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <div className="collection-wrapper">
              <div className="collection-inner">
                <div className="collection-title">
                  <h2><small>搜索</small>{this.props.match.params.title}<small>结果如下：</small></h2>
                </div>
                {
                  articleList.length > 0 ?
                    articleList.map((item, i) => {
                      return (
                        <article className="post" key={i}>
                          <header className="post-header">
                            <div className="post-meta">
                              <time>{dateformat(item.date, 'yyyy-mm')}</time>
                            </div>
                            <h1 className="post-title">
                              <Link to={`/article/${item.id}`}>{item.title}</Link>
                            </h1>
                          </header>
                        </article>
                      )
                    }):
                    <div className="tips">暂无数据</div>
                }
              </div>
              <div className="pagination-wrapper">
                <Pagination onChange={this.pageOnChange} defaultCurrent={1} total={parseInt(total)} defaultPageSize={10}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    const title = this.props.match.params.title
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 10,
      title: title
    })
  }

  componentDidUpdate (prevPros) {
    const preTitle = prevPros.match.params.title
    const curTitle = this.props.match.params.title
    if (curTitle && preTitle && preTitle !== curTitle) {
      this.props.get_all_articles({
        pageNum: 1,
        pageSize: 5,
        title: curTitle
      })
    }
  }
}

// 设置默认值
ArticleListByCategory.defaultProps = {
  articleList: [],
  total: 0,
  match: {
    params: {}
  }
}

ArticleListByCategory.propTypes = {
  articleList: PropTypes.array,
  total: PropTypes.number,
  match: {
    params: PropTypes.object
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
    get_all_articles: bindActionCreators(get_all_articles, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ArticleListByCategory)