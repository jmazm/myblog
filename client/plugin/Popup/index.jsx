import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { replaceClass } from '../../lib/className'

import style from './style.css'

class Popup extends Component {
  constructor (props) {
    super(props)

    this.close = this.close.bind(this)
  }
  close () {
    replaceClass(this.$wrapper, 'popup-open', 'popup-close')
  }
  render () {
    const { title, content } = this.props
    return (
      <div class="popup popup-open" rel={ele => this.$wrapper = ele}>
        <header class="popup-header">
          <h2 class="header-title">{ title }</h2>
        </header>
        <div class="popup-content">{ content }</div>
        <footer class="popup-footer">
          <button type="button" class="sure-btn" onClick={ this.close }>确定</button>
        </footer>
      </div>
    )
  }
  componentWillUnmount () {
    this.$wrapper = null
  }
}

Popup.defaultProps = {
  title: 'alert',
  content: ''
}
Popup.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}

export default Popup