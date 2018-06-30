import React, { Component } from 'react'

// === connect() 提供了在整个 React 应用的任意组件中获取 store 中数据的功能 === //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import ArticleList from '../../components/ArticleList'
import Pagination from '../../../../plugin/pagination'


import { actions as ArticleReducer } from '../../../../redux/reducer/articleReducer'

const { get_all_articles } = ArticleReducer

/**
 * 生命周期 - 三大阶段
 * 首次挂载：getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount
 * 重新挂载：getInitialState、componentWillMount、render 和componentDidMount，但并不执行 getDefaultProps
 * // ===
 * 1. Mounting - 挂载
   1.1 constructor
       super(props)、设置默认的state、不要setState、 bind event handlers
   1.2 componentWiilMount
       没有任何组件可以使用，不能做任何关于DOM的事情；
       不要setState
   1.3 render
   1.4 componentDidMount
       加载数据（ajax）、 set up any subscriptions【don’t forget to unsubscribe in componentWillUnmount()】
       setState()【会引起额外的渲染 - render会被调用两次，但会发生在浏览器更新屏幕之前】
 * 2. Updating - 更新阶段
   2.1 componentWillRecieveProps(object nextProps)
      如果父组件引起子组件再渲染，那么这个方法就会被调用，无论props是否有改变；setState()
   2.2 shouldComponentUpdate(object nextProps, object nextState)
      不要setState；
      return false并不是阻止子组件再渲染当他们的state变化时；
      React.PureComponent；
      不推荐深检查和使用JSON.stringify
   2.3 componentWillUpdate(object nextPorps, object nextState)
      不要setState
   2.4 render()
   2.1 componentDidUpdate(prevProps, prevState, snapshot)
      setState()；发请求
 * 3. Unmounting - 卸载
   3.1 componentWillMount
 * === //
 */

class Home extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.pageOnChange = this.pageOnChange.bind(this)
  }

  // 等价调用内部的 getDefaultProps方法(getDefaultProps只执行一次)
  static defaultProps = {
    articleList: [],
    total: 0
  }

  static propTypes = {
    articleList: PropTypes.array,
    total: PropTypes.number
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