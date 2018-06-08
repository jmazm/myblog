import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import './style.css'

import {actions} from '../../../../redux/reducer/tagReducer'

const {get_all_tags} = actions

class AdminTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: []
    }
  }
  render () {
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理标签"/>
          <div className="content-inner">
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminTag)