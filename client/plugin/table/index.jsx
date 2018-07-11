import React, { Component, createElement } from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import Pagination from '../pagination'

import style from './index.css'

/**
 * react创建组件的三种方式及其区别
 * // ===
 * 1. 函数式定义的无状态组件，被精简成一个render方法的函数来实现的，不会有组件实例化的过程 【实际上就是一个纯函数 - 给定相同的输入，它总是返回相同的输出；过程没有副作用，没有额外的状态依赖】
   1.1 组件不会被实例化，整体渲染性能得到提升
   1.2 组件不能访问this对象
   1.3 组件无法访问生命周期的方法
   1.4 无状态组件只能访问输入的props
 * 2. es5原生方式React.createClass定义的组件
   2.1 存在问题：
     2.1.a React.createClass会自绑定函数方法（不像React.Component只绑定需要关心的函数）导致不必要的性能开销，增加代码过时的可能性。
     2.1.b React.createClass的mixins不够自然、直观；
 * 3. es6形式的extends React.Component定义的组件
 * === //
 *
 * // ===
 * 1. React.createClass与React.Component区别
   1.1 函数this自绑定：前者创建的组件中的每一个函数成员都会自动绑定this，而后者则需要手动绑定
   1.2 组件属性类型propTypes及其默认props属性defaultProps配置不同
       React.createClass - defaultProps使用getDefaultProps方法，propTypes
       defaultProps - static propTypes + static defaultProps
   1.3 组件初始状态state的配置不同
     React.createClass - getInitialState()
     defaultProps - constructor 中的 this.state = {}
   1.4 Mixins的支持不同
 * === //
 */

/**
 * 表格头部
 * @param columns
 * @constructor
 */
const TableHeader = (columns) => {
  return (
    <div className={ style['table-header'] }>
      <div className={ `${style['header-tr']} ${ style['tr'] }` }>
        {
          columns.map((item, i) => {
            return (
              <div className={ style['th'] } key={ item.key }><span>{ item.title }</span></div>
            )
          })
        }
      </div>
    </div>
  )
}

class Table extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.setBodyTd = this.setBodyTd.bind(this)
  }

  static defaultProps = {
    columns: [],
    dataSource: [],
    pagination: {}
  }

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
  }

  /**
   * 设置表头
   * columns 的值
   * @example {
   *  title: '', // 表头的名称
   *  key: '' // 表头对应内容的关键字
   * }
   * @return {XML}
   */
  setHeader () {
    const { columns } = this.props

    return (
      <div className={ style['table-header'] }>
        <div className={ `${style['header-tr']} ${ style['tr'] }` }>
          {
            columns.map((item, i) => {
              return (
                <div className={ style['th'] } key={ item.key }><span>{ item.title }</span></div>
              )
            })
          }
        </div>
      </div>
    )
  }

  /**
   * 设置表格内容
   * 1、先创建行
   * 2、再创建列
   * @return {XML}
   */
  setBody () {
    const { dataSource } = this.props

    /**
     * 循环产生的组件要使用key值
     * // ===
     * 1. key值的作用：是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识
       即：react会借助元素的key值判断是需要重新创建元素、或者交换元素位置，减少不必要的元素渲染。

      旧: A B C D
      新：B A D C

     lastIndex 一直在更新，表示访问过的节点在旧集合中最右的位置（即最大的位置）

     if (prevChild === nextChild)
     if(child._mountIndex < lastIndex)
     lastIndex = Math.max(prevChild._mountIndex, lastIndex);
     prevChild._mountIndex = nextIndex;
     * === //
     */
    return (
      <div className={ style['table-body'] }>
        {
          dataSource.length > 0 ?
            dataSource.map((item, i) => {
              return (
                <div className={ `${ style['body-tr'] } ${style['tr']}` } key={item.key}>
                  { this.setBodyTd(item, i) }
                </div>
              )
            })
             :
            <div className={ style['none'] }>暂无数据</div>
        }
      </div>
    )
  }

  setBodyTd (data, index) {
    const { columns } = this.props

    const bodyTdContent = (render) => {
      return (
        <span>{ render }</span>
      )
    }

    return columns.map((item) => {
      return (
        <div className={ style['td'] } key={`${ item.key }_${ index }`}>
          {
            item.render ?
              bodyTdContent(item.render(data, index)) :
              data[item.key]
          }
        </div>
      )
    })
  }

  render () {
    const { pagination } = this.props

    return (
      <div>
        <div className={ style['table'] }>
          { this.setHeader() }
          { this.setBody() }
        </div>
        {
          pagination == false ?
            '' :
            <Pagination config={ pagination }/>
        }
      </div>
    )
  }
}

export default Table