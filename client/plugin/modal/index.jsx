import React, {Component} from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import modal from './index.css'

class Modal extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.state = {
      // 模态弹框的显示状态
      visible: false
    }
  }

  render () {
    const { content, title } = this.props

    return (
      <div className="modal">
        <div className="modal-inner">
          <header className="modal-header">
            <h2 className="header-title">{title || '标题'}</h2>
            <a href="javascript:;" className="del">x</a>
          </header>
          <div className="modal-content">
            <div className="content-inner">
              {content}
            </div>
          </div>
          <footer className="modal-footer">
            <button type="button" className="primary">确定</button>
            <button type="button" className="normal">取消</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default Modal