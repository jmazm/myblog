import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.state = {
      title: ''
    }
  }
  handleOnChange (e) {
    this.setState({
      title: e.target.value
    })
  }
  handleOnClick () {
    const {title} = this.state

    location.href = `/search/${title}`
  }
  render () {
    return (
      <div className="search-bar">
        <div className="search-bar-inner">
          <input className="search-input" name="title" onChange={this.handleOnChange}/>
          <button className="fa fa-search" onClick={this.handleOnClick}></button>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar