import React, {Component} from 'react'

import './style.css'

class Table extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {dataSource} = this.props
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>文件夹名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              dataSource.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>${item.id}</td>
                    <td>${item.folderName}</td>
                    <td><a href="javascript:;" className="js-modify">修改</a><a href="javascript:;" className="js-del">删除</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = Table
