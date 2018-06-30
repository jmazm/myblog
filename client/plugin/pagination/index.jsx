import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactAddonPureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'

import style from './index.css'

class Pagination extends Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = ReactAddonPureRenderMixin.shouldComponentUpdate

    this.state = {
      pageNum:  1,
      pageSize: 15,
      preNum: 0
    }

    this.setBasicStru = this.setBasicStru.bind(this)
    this.setList = this.setList.bind(this)
    this.handleOnClickPage = this.handleOnClickPage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleOnClickNextPage = this.handleOnClickNextPage.bind(this)
    this.handleOnClickPrevPage = this.handleOnClickPrevPage.bind(this)
  }

  static defaultProps = {
    total: 0,
    defaultCurrent: 1,
    defaultPageSize: 15,
    config: {},
    onChange: function () {}
  }

  static propTypes = {
    total: PropTypes.number,
    defaultCurrent: PropTypes.number,
    defaultPageSize: PropTypes.number,
    config: PropTypes.object,
    onChange: PropTypes.func
  }

  /**
   * 分页插件的基本结构
   * @param total
   * @return {XML}
   */
  setBasicStru () {
    const { total, config } = this.props
    const { pageNum } = this.state
    const totalPage = this.countTotalPage()
    const totalNum = config.total || total

    if (totalNum == 0) {
      return (
        <div className={ style.pagination }><small className={ style['tips'] }>暂无数据</small></div>
      )
    }

    const prevClass = classnames({
      [style.btn]: true,
      [style.forbidden]: pageNum == 1
    })

    const nextClass = classnames({
      [style.btn]: true,
      [style.forbidden]: pageNum == totalPage
    })

    return (
      <div className={ style['pagination'] }>
        <a href="javascript:;" className={ prevClass } onClick={this.handleOnClickPrevPage}>上一页</a>
        { this.setList(pageNum) }
        <a href="javascript:;" className={ nextClass } onClick={this.handleOnClickNextPage}>下一页</a>
      </div>
    )
  }

  /**
   * 设置active类
   * @param pageNum 当前页数
   * @param optPageNum 条件当前页数
   * @return {*}
   */
  setActiveClass (pageNum, optPageNum) {
    return classnames({
      [style['page-txt']]: true,
      [style.active]: pageNum == optPageNum,
    })
  }

  /**
   * 分页插件的展示的页数处理
   * @param pageNum
   * @return {XML}
   */
  setList (pageNum) {
    let cP = pageNum
    let tP = this.countTotalPage()

    // 1 2 3 4 5
    if (tP <= 5) {
      let arr = new Array(tP).fill(0)

      return (
        <ul className={ style['page-list'] }>
          {
            arr.map((item, i) => {
            return (
              <li className={ style['page-item'] } key={i} title={i + 1}>
                <a href="javascript:;"
                   className={ this.setActiveClass(pageNum, i + 1) }
                   onClick={ this.handleOnClickPage }
                >{ i + 1 }</a>
              </li>
            )
          })
          }
        </ul>
      )
    }
    // 1 2 3 4 5  ... 20
    else if (cP <= 4) {
      let arr = new Array(5).fill(0)

      return (
        <ul className={ style['page-list'] }>
          {
            arr.map((item, i) => {
              return (
                <li className={ style['page-item'] } key={i} title={i + 1}>
                  <a href="javascript:;"
                     className={ this.setActiveClass(pageNum, i + 1) }
                     onClick={ this.handleOnClickPage }
                  >{i + 1}</a>
                </li>
              )
            })
          }
          <li className={ style['page-item'] }>
            ...
          </li>
          <li className={ style['page-item'] } title={ tP }>
            <a href="javascript:;"
               className={ this.setActiveClass(pageNum, tP) }
               onClick={ this.handleOnClickPage }
            >{ tP }</a>
          </li>
        </ul>
      )
    }
    // 1 ... 16 17 18 19 20
    else if ([tP - 3, tP - 2, tP - 1, tP].includes(cP)) {
      let arr = [tP - 4, tP - 3, tP - 2, tP - 1, tP]

      return (
        <ul className={ style['page-list'] }>
          <li className={ style['page-item'] } title={1}>
            <a href="javascript:;"
               className={ this.setActiveClass(pageNum, 1) }
               onClick={ this.handleOnClickPage }
            >{1}</a>
          </li>
          <li className={ style['page-item'] }>
            ...
          </li>
          {
            arr.map((item, i) => {
              return (
                <li className={ style['page-item'] } key={i} title={item}>
                  <a href="javascript:;"
                     className={ this.setActiveClass(pageNum, item) }
                     onClick={ this.handleOnClickPage }
                  >{ item }</a>
                </li>
              )
            })
          }
        </ul>
      )
    }
    // 1 ... 7 8 9 10 11 ... 20
    else {
      let centerArr = [cP - 2, cP - 1, cP, cP + 1, cP + 2]

      return (
        <ul className={ style['page-list'] }>
          <li className={ style['page-item'] } title={1}>
            <a href="javascript:;"
               className={ this.setActiveClass(pageNum, 1) }
               onClick={ this.handleOnClickPage }
            >{1}</a>
          </li>
          <li className={ style['page-item'] }>
            ...
          </li>
          {
            centerArr.map((item, i) => {
              return (
                <li class={ style['page-item'] } title={ item } key={ i }>
                  <a href="javascript:;"
                     className={ this.setActiveClass(pageNum, item) }
                     onClick={ this.handleOnClickPage }
                  >{ item }</a>
                </li>
              )
            })
          }
          <li class={ style['page-item'] }>
            ...
          </li>
          <li class={ style['page-item'] } title={ tP } key={ i }>
            <a href="javascript:;"
               className={ this.setActiveClass(pageNum, tP) }
               onClick={ this.handleOnClickPage }
            >{ tP }</a>
          </li>
        </ul>
      )
    }
  }

  /**
   * 改变分页插件的状态
   * @return {Promise.<void>}
   */
  async onChange () {
    const { onChange, config } = this.props
    const { pageNum, pageSize } = this.state

    if (config.onChange) {
      await config.onChange(pageNum, pageSize)
    } else {
      await onChange(pageNum, pageSize)
    }
  }

  /**
   * 点击页数处理页面
   * @param e
   * @return {Promise.<void>}
   */
  async handleOnClickPage (e) {
    const target = e.target

    // 上一页的页面
    const prevPageNum = this.state.pageNum
    // 当前页码
    const curPageNum = parseInt(target.textContent)

    // 如果上一页的页数与当前页页数不相等，才执行onChange函数
    if (prevPageNum != curPageNum) {
      // 必须先修改state的pageNum页数
      await this.setState({
        pageNum:  curPageNum
      })

      await this.onChange()
    }
  }

  /**
   * 下一页
   * @param e
   * @return {Promise.<void>}
   */
  async handleOnClickNextPage () {
    const prevPageNum = this.state.pageNum
    const totalPage = this.countTotalPage()
    let curPageNum = 1


    // 如果上一页 小于 总页数，当前页 = 上一页+1
    if (prevPageNum < totalPage) {
      curPageNum = prevPageNum + 1
    }
    // 否则，当前页 = 总页数
    else {
      curPageNum = totalPage
    }

    // 如果不是最后一页，才setState以及执行onChange函数
    if (prevPageNum != curPageNum) {
      // 必须先修改state的pageNum页数
      await this.setState({
        pageNum: curPageNum
      })

      await this.onChange()
    }
  }

  /**
   * 上一页
   * @param e
   * @return {Promise.<void>}
   */
  async handleOnClickPrevPage () {
    // 上页页数
    let prevPageNum = this.state.pageNum
    // 当前页数
    let curPageNum = 1

    if (prevPageNum > 1) {
      curPageNum = prevPageNum - 1
    }

    // 如果上一页的页数与当前页页数不相等，才执行onChange函数
    if (prevPageNum != curPageNum) {
      // 必须先修改state的pageNum页数
      await this.setState({
        pageNum:  curPageNum
      })

      await this.onChange()
    }
  }

  /**
   * 计算总页数
   * @return {number}
   */
  countTotalPage () {
    const { defaultPageSize, total, config } = this.props
    const totalNum = config.total || total
    const pageSize = config.defaultPageSize || defaultPageSize

    return Math.ceil(totalNum / pageSize)
  }

  render () {
    return (
      <div className={ style['pag-wrapper'] }>
        { this.setBasicStru() }
      </div>
    )
  }
  
  async componentDidMount () {
    const { defaultCurrent, defaultPageSize, onChange, config} = this.props

    await this.setState({
      pageNum: config.defaultCurrent || defaultCurrent,
      pageSize: config.defaultPageSize || defaultPageSize
    })

    await this.onChange()
  }

  shouldComponentUpdate (nextProps, nextState) {
    const prevPage = this.state.pageNum
    const curPage = nextState.pageNum

    if (prevPage != curPage) {
      return true
    }
  }
}



export default Pagination
