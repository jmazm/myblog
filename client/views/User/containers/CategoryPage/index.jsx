import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import CategoryList from '../../components/CategoryList'
import ArticleList from '../../components/ArticleList'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'
import {actions as CategoryReducer} from '../../../../redux/reducer/categoryReducer'

import { Pagination } from 'antd';


const {get_all_articles} = ArticleReducer
const {get_all_categories} = CategoryReducer

class Category extends Component {
  constructor (props) {
    super(props)
  }
  pageOnChange (page, pagesize) {
    const id = this.props.match.params.id
    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize,
      category: id
    })
  }
  render () {
    const {articleList, total, categories} = this.props

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
              <CategoryList data={categories}/>
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
      category: id
    })
    this.props.get_all_categories()
  }

  componentDidUpdate (prevPros, prevState) {
    const preId = prevPros.match.params.id
    const curId = this.props.match.params.id
    if (curId && preId && preId !== curId) {
      this.props.get_all_articles({
        pageNum: 1,
        pageSize: 5,
        category: curId
      })
    }
  }
}

// 设置默认值
Category.defaultProps = {
  articleList: [],
  total: 0,
  categories: []
}

Category.propTypes = {
  articleList: PropTypes.array,
  total: PropTypes.number,
  categories: PropTypes.array
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles
  return {
    articleList,
    total,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_articles: bindActionCreators(get_all_articles, dispatch),
    get_all_categories: bindActionCreators(get_all_categories, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Category)