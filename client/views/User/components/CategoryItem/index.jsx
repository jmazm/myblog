import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class TagList extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {id, name} = this.props
    return (
      <li className="tag-item">
        <Link to={`/category/${id}/article`}>{name}</Link>
      </li>
    )
  }
}

module.exports = TagList