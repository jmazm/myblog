import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'

class TagList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {id, name, type} = this.props
    return (
      <li className="tag-item">
        <Link to={`/${type}/${name}/article`}>{name}</Link>
      </li>
    )
  }
}

module.exports = TagList