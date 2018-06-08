import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ArticleItem from '../ArticleItem'

class ArticleList extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
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