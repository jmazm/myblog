import React, {Component} from 'react'
import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'

class AdminCategory extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理类别"/>
          <div className="content-inner">
          </div>
        </div>
      </div>
    )
  }
}

module.exports = AdminCategory