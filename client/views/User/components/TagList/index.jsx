import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import TagItem from '../TagItem'

import './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    const {data, type} = this.props
    return (
      <div className="tag-wrapper">
        <ul className="tag-list">
          {
            data.length > 0 ?
              data.map((item, i) => {
                return <TagItem id={item.id} name={item.name} key={i} type={type}/>
              }) :
              <li>暂无数据</li>
          }
        </ul>
      </div>
    )
  }
}

module.exports = SearchBar