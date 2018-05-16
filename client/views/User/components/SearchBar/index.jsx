import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    return (
      <div className="search-bar">
        <div className="search-bar-inner">
          <input className="search-input"/>
          <button className="fa fa-search"></button>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar