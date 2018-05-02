import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './style.css'

class SideBar extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <aside className="aside">
            <nav className="aside-nav">
              <ul className="aside-nav-list">
                <li className="list-item"><Link to="/">查看图片</Link></li>
                <li className="list-item"><Link to="/upload">上传图片</Link></li>
                <li className="list-item"><Link to="/folder">文件夹管理</Link></li>
              </ul>
            </nav>
          </aside>
        )
    }
}

module.exports = SideBar
