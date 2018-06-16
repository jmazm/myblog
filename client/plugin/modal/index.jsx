import React, {Component} from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import modal from './index.css'

class Modal extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate
    this.setModalClassName = this.setModalClassName.bind(this)
  }

  setModalClassName (visible) {
    return classnames({
      modal: true,
      hide: !visible
    })
  }

  render () {
    const { content, title, visible, onCancel, onOk } = this.props

    return (
      <div className={this.setModalClassName(visible)}>
        <div className="modal-inner">
          <header className="modal-header">
            <h2 className="header-title">{title}</h2>
            <a href="javascript:;" className="del" onClick={onCancel}>x</a>
          </header>
          <div className="modal-content">
            <div className="content-inner">
              {content}
            </div>
          </div>
          <footer className="modal-footer">
            <button type="button" className="primary" onClick={onOk}>确定</button>
            <button type="button" className="normal" onClick={onCancel}>取消</button>
          </footer>
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  title: '请输入标题',
  visible: false,
  content: ''
}

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool
}

export default Modal