import React, { Component } from 'react'

class CategorySelectItem extends Component {
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

module.exports = CategorySelectItem