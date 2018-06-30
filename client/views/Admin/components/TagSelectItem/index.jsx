import React, { Component } from 'react'

class SelectItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { id, value } = this.props

    return (
      <option value={ id }>{ value }</option>
    )
  }
}

module.exports = SelectItem