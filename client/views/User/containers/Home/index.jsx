import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import ArticleList from '../../components/ArticleList'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'

import Pagination from '../../../../plugin/pagination';

import './style.css'

const { get_all_articles } = ArticleReducer

class Home extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.pageOnChange = this.pageOnChange.bind(this)
  }

  /**
   * 控制分页插件页数变化函数
   * @param page
   * @param pagesize
   */
  pageOnChange (page, pagesize) {
    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize
    })
  }
  render () {
    const { articleList, total } = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <ArticleList data={articleList}/>
            <div className="pagination-wrapper">
              <Pagination onChange={this.pageOnChange} defaultCurrent={1} total={parseInt(total)} defaultPageSize={5}/>
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
  }
}

// 设置默认值
Home.defaultProps = {
  articleList: [],
  total: 0
}

Home.propTypes = {
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
)(Home)