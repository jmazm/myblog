import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import style from './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: ''
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnKeyup = this.handleOnKeyup.bind(this)
  }

  /**
   * 表单变化
   * @param e
   */
  handleOnChange (e) {
    this.setState({
      title: e.target.value.trim()
    })
  }

  /**
   * 点击事件
   */
  handleOnClick () {
    const { title } = this.state

    if (title != '') {
      location.href = `/search/${title}`
    } else {
      alert('请输入要查找的文章名称')
    }
  }

  /**
   * 键盘
   * // ===
   * 1. 相关事件
     1.1 keyup：当用户释放键盘上的键时触发。
     1.2 keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。 - 【任意键】
     1.3 keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。- 【字符键】
   * 2. 键盘事件触发顺序：keydown ===》 keypress ====》 keyup
       keydown 和 keypress 都是在文本框发生变化之前被触发的；
       keyup 事件则是在文本框已经发生变化之后被触发的。
   * 3. 键码 和 字符编码 -> ASCII编码
     3.1 键码 - keyCode
     3.2 字符编码 - charCode - 触发keypress事件才包含值，否则返回的是0 - ie9+
   * === //
   */

  handleOnKeyup (e) {
    const { title } = this.state

    // 按下enter键也可以触发

    if (e.keyCode == 13) {
      if (title != '') {
        location.href = `/search/${title}`
      } else {
        alert('请输入要查找的文章名称')
      }
    }

  }
  render () {
    return (
      <div className={ style['search-bar'] }>
        <div className={ style['search-bar-inner'] }>
          <input className={ style['search-input'] } name="title" onChange={ this.handleOnChange } onKeyUp={ this.handleOnKeyup }/>
          <button className={ style['search-btn'] } onClick={ this.handleOnClick }></button>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar