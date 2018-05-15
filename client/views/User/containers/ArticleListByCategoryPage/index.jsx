import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import dateformat from 'dateformat'

import Header from '../../components/Header'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'

import { Pagination } from 'antd';


const {get_all_articles} = ArticleReducer

class ArticleListByCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }
  pageOnChange (page, pagesize) {
    const category = decodeURIComponent(this.props.match.params.category)
    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize,
      category: category
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
                  <h2>{this.props.match.params.category}<small>类别</small></h2>
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
                    <div>暂无数据</div>
                }
              </div>
              <div className="pagination-wrapper">
                <Pagination onChange={this.pageOnChange.bind(this)} defaultCurrent={1} total={parseInt(total)} defaultPageSize={10}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    const category = this.props.match.params.category
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 10,
      category: category
    })
  }

  componentDidUpdate (prevPros) {
    const preCategory = prevPros.match.params.category
    const curCategory = this.props.match.params.category
    if (curCategory && preCategory && preCategory !== curCategory) {
      console.log(preCategory, curCategory)
      this.props.get_all_articles({
        pageNum: 1,
        pageSize: 5,
        category: curCategory
      })
    }
  }
}

// 设置默认值
ArticleListByCategory.defaultProps = {
  articleList: [],
  total: 0
}

ArticleListByCategory.propTypes = {
  articleList: PropTypes.array,
  total: PropTypes.number
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