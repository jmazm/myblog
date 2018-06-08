import React, {Component} from 'react'

class SelectItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <option value={this.props.id}>{this.props.value}</option>
    )
  }
}

module.exports = SelectItem