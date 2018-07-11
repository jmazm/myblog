import React, { Component } from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import style from './index.css'

/**
 * reacr实现模态弹框
 * // ===
 * 1. 三部分组成
   1.1 header - 标题 + 删除符号（隐藏模态弹框）
   1.2 body - 想要展示的内容
   1.3 footer - 主要是两个按钮
       确认按钮：发送请求/重置表单/隐藏模态框 - onOk事件
       取消按钮：隐藏模态框 - onCancel事件
 * 2. 模态框的显示和隐藏 - 主要通过props: visible 控制
 * === //
 */

class Modal extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate
    this.setModalClassName = this.setModalClassName.bind(this)
  }


  static defaultProps = {
    title: '请输入标题',
    visible: false,
    content: ''
  }

  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool
  }

  setModalClassName (visible) {
    return classnames({
      [style.modal]: true,
      [style.hide]: !visible
    })
  }

  render () {
    const { content, title, visible, onCancel, onOk } = this.props

    return (
      <div className={ this.setModalClassName(visible) }>
        <div className={ style['modal-inner'] }>
          <header className={ style['modal-header'] }>
            <h2 className={ style['header-title'] }>{ title }</h2>
            <a href="javascript:;" className={ style.del } onClick={ onCancel }>x</a>
          </header>
          <div className={ style['modal-content'] }>
            <div className={ style['content-inner'] }>
              {content}
            </div>
          </div>
          <footer className={ style['modal-footer'] }>
            <button type="button" className={ style['primary'] } onClick={ onOk }>确定</button>
            <button type="button" className={ style['normal'] } onClick={ onCancel }>取消</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default Modal