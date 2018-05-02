import React, {Component} from 'react'

import CategoryItem from '../CategoryItem'

class CategoryList extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {data} = this.props
    return (
      <div className="tag-bar">
        <h2 className="tag-ti">博客分类</h2>
        <ul className="tag-list">
          {
            data.length > 0 ?
              data.map((item, i) => {
                return <CategoryItem id={item.id} name={item.name} key={i}/>
              }) :
              <li>暂无数据</li>
          }
        </ul>
      </div>
    )
  }
}

module.exports = CategoryList