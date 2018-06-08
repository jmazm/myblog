import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'

import './style.css'

class Header extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
          <aside className="admin-aside">
              <nav className="nav-bar">
                  <ul className="nav-list clearfix">
                      <li className="list-item"><Link to="/">发表文章</Link></li>
                      <li className="list-item"><Link to="/admin/category">管理类别</Link></li>
                      <li className="list-item"><Link to="/admin/tag">管理标签</Link></li>
                      <li className="list-item"><Link to="/admin/article">管理文章</Link></li>
                      <li className="list-item"><Link to="/admin/management">管理用户</Link></li>
                      <li className="list-item"><a href="/api/logout">退出登录</a></li>
                  </ul>
              </nav>
          </aside>
        )
    }
}

module.exports = Header