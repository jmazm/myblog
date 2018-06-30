import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import TagList from '../../components/TagList'
import { actions as CategoryReducer } from '../../../../redux/reducer/categoryReducer'

const { get_all_categories } = CategoryReducer

class Category extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }


// 设置默认值
  static defaultProps = {
    categories: []
  }

  static propTypes = {
    categories: PropTypes.array
  }

  /**
   * react
   * // ===
   * 1. 父组件向子组件通信 - 通过props实现
   * 2. 子组件向父组件通信
     2.1 父组件：通过state设置相关的状态 以及一些方法【方法中会通过this.setState修改对应的状态】，并将这个方法通过props传递给子组件
     2.2 子组件：通过this.props获取对应的方法，使用并传递相应的参数即可
     常见实战：输入框
   * 3. 跨级组件通信 - 使用 context 来实现跨级父子组件间的通信
     3.1 实例
       父组件：不需要向子组件传递props，而是定义ChildContext
         static childContextTypes = {
           color: PropTypes.string,
         };
         getChildContext() {
           return {
           color: 'red',
           };
          }
       子组件：可以直接从context最终拿到父组件定义的属性和值
       class ListItem extends Component {
         static contextTypes = {
          color: PropTypes.string,
         };
         render() {
           const { value } = this.props;
           return (
           <li style={{background: this.context.color}}>
           <span>{value}</span>
           </li>
         );}
       }
     3.2 使用场景 - 使用 context 比较好的场景是真正意义上的全局信息且不会更改，例如界面主题、用户信息等。
     3.3 注意：
     不推荐大量使用context，因为尽管它可以减少逐层传递，但当组件结构复杂的时候，
     我们并不知道 context 是从哪里传过来的。Context 就像一个全局变量一样，而
     全局变量正是导致应用走向混乱的罪魁祸首之一，给组件带来了外部依赖的副作用。
   * === //
   */

  render () {
    const { categories } = this.props

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          <div className="main-inner">
            <div className="widget-wrapper">
              <h2 className="widget-title"><i className="icon-tags"></i>类别展示</h2>
              <TagList data={ categories } type="category"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_categories()
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_categories: bindActionCreators(get_all_categories, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Category)
