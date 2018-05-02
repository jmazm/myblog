import React, {Component} from 'react'
import {Icon} from 'antd'

class UploadBtn extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        )
    }
}

module.exports = UploadBtn
