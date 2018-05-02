import React, {Component} from 'react'
import AdminNav from '../../components/AdminNav'

class AdminCategory extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="blog-management">
        <AdminNav/>
      </div>
    )
  }
}

module.exports = AdminCategory