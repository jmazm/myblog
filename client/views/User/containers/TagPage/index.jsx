import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import TagList from '../../components/TagList'

import { actions as TagReducer} from '../../../../redux/reducer/tagReducer'

const { get_all_tags } = TagReducer

class Tag extends Component {
  constructor (props) {
    super(props)
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    
    this.state = {
      currentPage: 1
    }
  }

  /**
   * defaultProps + propTypes
   * // ===
   * 1. 用途：提供默认值，当父组件没有提供相应的props时就使用此
        在使用redux的时候，由于数据最终都会依靠props表示出来，因此，如果不为对应的props值设置默认值，那么在一开始加载页面的时候，
        有一些组件会因此某些数据仍未undefined报错或者数据格式不对报错。
   * 2. 为什么要在 defaultProps 和 propTypes前面添加static？
        类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
        如果在一个方法前，加上static关键字，就表示该方法不会被实例继承（this对象），而是直接通过类来调用，这就称为“静态方法”。
        而在 defaultProps 和 propTypes前面添加static，则说明他们是静态属性，不会被实例继承
   * === //
   */

  // 等价调用内部的 getDefaultProps 方法(getDefaultProps只执行一次)
  static defaultProps = {
    tags: []
  }

  static propTypes = {
    tags: PropTypes.array
  }

  render () {
    const { tags } = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <div className="widget-wrapper">
              <h2 className="widget-title"><i className="icon-tags"></i>标签展示</h2>
              <TagList data={ tags } type="tag"/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.get_all_tags()
  }
}

function mapStateToProps (state) {
  return {
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Tag)