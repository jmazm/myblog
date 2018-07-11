import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import dateformat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'

import { actions as ArticleReducer } from '../../../../redux/reducer/articleReducer'

import Pagination from '../../../../plugin/pagination';


const { get_all_articles } = ArticleReducer

class SearchPage extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate

    this.state = {
      currentPage: 1
    }

    this.pageOnChange = this.pageOnChange.bind(this)
  }

  static defaultProps = {
    articleList: [],
    total: 0,
    match: {
      params: {}
    }
  }

  static propTypes = {
    articleList: PropTypes.array,
    total: PropTypes.number,
    match: PropTypes.shape({
      params: PropTypes.object
    })
  }

  pageOnChange (page, pagesize) {
    const title = decodeURIComponent(this.props.match.params.title)

    this.props.get_all_articles({
      pageNum: page,
      pageSize: pagesize,
      title: title
    })

    /**
     * setState(partialState,callback) - 异步更新
     *    - callback(prevState, props) - 回调函数将在 setState 完成后执行，并且重新渲染组件，在这个回调函数中你可以拿到刚更新的state的值
     * // ===
                                 this.setState(newState)
                                          |
                              newState 存入 pending 队列
                                          |
                                   调用 enqueueUpdate
                                          |
                                    是否处于批量更新模式(!batchingStrategy.isBatchingUpdates)
                       ——————————|————————
                       |Y                                 N|
     将组件保存到dirtyComponents中               遍历dirtyComponents
                                                 调用updateComponent
                                              更新 pending state or props
     * === //
     * // ===
     * 1.可通过 this.state来访问state，通过 this.setState()来更新state，当 this.setState()被调用时，React又会重新调用render方法来重新渲染UI。
     * 2. setState是通过一个队列机制实现state更新。当执行 setState的时候，将需要更新的state放到状态队列中，而不会立刻更新this.state。
          如果多次传递的是对象 -  this.setState({ text: this.state.text + '111' }) - react会做对象合并的操作，如果key一样，后者的值就会覆盖前面的值
          如果多次传递的是函数 -  this.setState((prevState) => { return { text: prevState.text + '222' }}) - 每次 React 从 setState 执行函数，并通过传递已更新的状态来更新你的状态

          在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。
     * 3、不能直接用 this.state = xxx 这种方式来修改，如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面
     * === //
     */
    this.setState({
      currentPage: page
    })
  }

  render () {
    const { articleList, total } = this.props

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
                              <time>{ dateformat(item.date, 'yyyy-mm') }</time>
                            </div>
                            <h1 className="post-title">
                              <Link to={ `/article/${item.id}` }>{ item.title }</Link>
                            </h1>
                          </header>
                        </article>
                      )
                    }):
                    <div className="tips">暂无数据</div>
                }
              </div>
              <div className="pagination-wrapper">
                <Pagination onChange={ this.pageOnChange } defaultCurrent={1} total={ parseInt(total) } defaultPageSize={10}/>
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

  /**
   * componentDidUpdate
   * @param prevPros
   */
  componentDidUpdate (prevPros) {
    const preTitle = prevPros.match.params.title
    const curTitle = this.props.match.params.title

    // 新标题与就标题不一样才发送请求
    if (curTitle && preTitle && preTitle !== curTitle) {
      this.props.get_all_articles({
        pageNum: 1,
        pageSize: 5,
        title: curTitle
      })
    }
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
)(SearchPage)