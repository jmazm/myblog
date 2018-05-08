import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
// import SearchBar from '../../components/SearchBar'
import ArticleList from '../../components/ArticleList'

import {actions as ArticleReducer} from '../../../../redux/reducer/articleReducer'

import { Pagination } from 'antd';


const {get_all_articles} = ArticleReducer

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
    const {articleList, total} = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          {/*<SearchBar/>*/}
          <div className="main-inner">
            <ArticleList data={articleList}/>
            <div className="pagination-wrapper">
              <Pagination onChange={this.pageOnChange.bind(this)} defaultCurrent={1} total={parseInt(total)} defaultPageSize={5}/>
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
  total: 0
}

Category.propTypes = {
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
)(Category)