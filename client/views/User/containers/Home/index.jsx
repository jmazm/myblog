import React, { Component } from 'react'

// === connect() 提供了在整个 React 应用的任意组件中获取 store 中数据的功能 === //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import ArticleList from '../../components/ArticleList'
import Pagination from '../../../../plugin/pagination';

import { actions as ArticleReducer } from '../../../../redux/reducer/articleReducer'


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
            <ArticleList data={ articleList }/>
            <div className="pagination-wrapper">
              <Pagination onChange={ this.pageOnChange } defaultCurrent={ 1 } total={ parseInt(total) } defaultPageSize={ 5 }/>
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

/**
 *
  // ===
   mapStateToProps(state)：
   1、作为第一个参数，定义需要从Redux状态树中提取哪些部分作为props传给当前组件；
   2、如果不传入这个参数，React 组件将永远不会和 Redux 的状态树产生任何关系。
  === //
 */

function mapStateToProps (state) {
  const { articleList, total } = state.articles

  return {
    articleList,
    total
  }
}

/**
 *
 // ===
   mapDispatchToProps(store的dipatch, [this.props])：
   1、作为connect的第二个参数
   2、利用这个方法，可以在 connect 中方便地将 actionCreator 与 dispatch 绑定在一起
     （利用 bindActionCreators 方法），最终绑定好的方法也会作为 props 传给当前组件。
 === //
 */
function mapDispatchToProps (dispatch) {
  return {
    get_all_articles: bindActionCreators(get_all_articles, dispatch)
  }
}

// ===  connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {})  === //
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Home)