import React, {Component} from 'react'

import TagItem from '../../views/User/components/TagItem'

import './style.css'



class FilterListItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <li className="list-item">{this.props.name}</li>
    )
  }
}

module.exports = FilterListItem