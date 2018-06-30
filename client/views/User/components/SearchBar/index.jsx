import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import style from './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: ''
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)

  }

  handleOnChange (e) {
    this.setState({
      title: e.target.value
    })
  }

  handleOnClick () {
    const { title } = this.state

    location.href = `/search/${title}`
  }
  render () {
    return (
      <div className={ style['search-bar'] }>
        <div className={ style['search-bar-inner'] }>
          <input className={ style['search-input'] } name="title" onChange={ this.handleOnChange }/>
          <button className={ style['search-btn'] } onClick={ this.handleOnClick }></button>
        </div>
      </div>
    )
  }
}

module.exports = SearchBar