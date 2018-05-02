import React, {Component} from 'react'

import TagItem from '../TagItem'

import './style.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {data} = this.props
    return (
      <div className="tag-bar">
        <h2 className="tag-ti">热门标签</h2>
        <ul className="tag-list">
          {
            data.length > 0 ?
              data.map((item, i) => {
                return <TagItem id={item.id} name={item.name} key={i}/>
              }) :
              <li>暂无数据</li>
          }
        </ul>
      </div>
    )
  }
}

module.exports = SearchBar