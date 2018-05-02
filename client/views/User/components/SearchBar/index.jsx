import React, {Component} from 'react'

import './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="search-bar clearfix">
        <div className="search-inner clearfix">
          <input className="search-input"/>
          <button type="button" className="search-btn">搜素</button>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar