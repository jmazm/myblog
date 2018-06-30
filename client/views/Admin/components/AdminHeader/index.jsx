import React, {Component} from 'react'

import style from './style.css'

class AdminHeader extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title } = this.props
    return (
      <header className={ style['admin-header'] }>
        <h2>{ title }</h2>
      </header>
    )
  }
}

module.exports = AdminHeader