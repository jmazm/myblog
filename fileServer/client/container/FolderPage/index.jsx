import React, {Component} from 'react'
import SideBar from '../../component/sidebar'
import Table from '../../component/table'

import './style.css'

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: `Edrward ${i}`,
    folderName: `文件夹${i}`
  });
}

class FolderPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: data
    }
  }

  render () {
    return (
      <div className="wrapper img--management">
      <SideBar/>
      <div className="content">
        <h2 className="content-title">文件夹管理</h2>
        <button type="button">添加文件夹</button>
        <div className="content-inner clearfix">
          <Table dataSource={this.state.data} />
        </div>
      </div>
      </div>
    )
  }
}

export default FolderPage
