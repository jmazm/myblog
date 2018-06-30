import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import style from './style.css'

class TagList extends Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }

  render () {
    const { id, name, type } = this.props
    return (
      <li className={ style['tag-item'] }>
        <Link to={`/${type}/${name}/article`}>{name}</Link>
      </li>
    )
  }
}

module.exports = TagList