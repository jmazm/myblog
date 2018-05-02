import React, {Component} from 'react'
import AdminNav from '../../components/AdminNav'

class AdminArticle extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="blog-management">
        <AdminNav/>
        <div className="blog-management-content">
          <div className="article-management-wrapper">
            <div className="article-item">
              <div className="article-ti">
                文章名
              </div>
              <div className="article-opt">
                <button type="button">修改</button>
                <button type="button">删除</button>
                <button type="button">发表</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = AdminArticle