import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {api, getRequest} from '../../../../fetch/fetch'

import './style.css'

class Header extends Component {
    constructor (props) {
        super(props)
      this.handleLogout = this.handleLogout.bind(this)
    }
    async handleLogout () {
      const result = await getRequest(api.adminLogoutApi)

      if (result.status == 'success') {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('articleList')

        location.href = '/'
      }
    }
    render () {
        return (
          <aside className="admin-aside">
              <nav className="nav-bar">
                  <ul className="nav-list clearfix">
                      <li className="list-item"><Link to="/admin/newArticle">发表文章</Link></li>
                      <li className="list-item"><Link to="/admin/category">管理类别</Link></li>
                      <li className="list-item"><Link to="/admin/tag">管理标签</Link></li>
                      <li className="list-item"><Link to="/admin/article">管理文章</Link></li>
                      <li className="list-item"><Link to="/admin/management">管理用户</Link></li>
                      <li className="list-item"><a href="javascript:;" onClick={this.handleLogout}>退出登录</a></li>
                  </ul>
              </nav>
          </aside>
        )
    }
}

module.exports = Header