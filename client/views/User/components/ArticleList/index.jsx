import React, {Component} from 'react'

import ArticleItem from '../ArticleItem'

class ArticleList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {data} = this.props
    return (
      <div className="article-list">
        {
         data.length > 0 ?
           data.map((item, i) => {
             return <ArticleItem data={item} key={i}/>
           }) :
           <div>暂无文章！</div>
        }
      </div>
    )
  }
}

module.exports = ArticleList