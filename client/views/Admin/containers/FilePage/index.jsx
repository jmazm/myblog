import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropsType from 'prop-types'

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import { crossApi } from '../../../../fetch/fetch'



class AdminTag extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      tag: ''
    }
    
    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

  }


  static defaultProps = {
  }

  static propTypes = {
  }

  render () {
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="文件管理系统"/>
          <div className="content-inner">
            <iframe src={ crossApi.getFileSystem } className="iframe"></iframe>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminTag)