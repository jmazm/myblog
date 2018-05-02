import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import SideBar from '../../component/sidebar'
import UploadBtn from '../../component/uploadBtn'
import FolderSelect from '../../component/folderSelect'
import {Upload, Modal} from 'antd'

import {actions as FolderActions} from '../../redux/reducer/folderReducer'

import './style.css'

const {get_folders} = FolderActions

class UploadPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      folderData: {
        Folder_idFolder: 1,
        FolderName: 'progress'
      }
    }

  }
  handleCancel () {
    this.setState({
      previewVisible: false
    })
  }

  handlePreview (file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange ({ fileList }) {
    this.setState({
      fileList
    })
  }
  handleSelectChange (e) {
    this.setState({
      folderData: {
        Folder_idFolder: e.target.value,
        FolderName: e.target.querySelector(`[value="${e.target.value}"]`).innerHTML
      }
    })
  }
  render () {
    const { previewVisible, previewImage, fileList, folderData} = this.state
    const {folders} = this.props

    return (
      <div className="wrapper img--management">
      <SideBar/>
      <div className="content">
        <h2 className="content-title">图片上传</h2>
        <div className="select-wrapper">
          文件夹：<FolderSelect data={folders} onChange={this.handleSelectChange.bind(this)}/>
        </div>
        <div className="content-inner clearfix">
          <Upload
            action={`/v1/img`}
            listType="picture-card"
            onPreview={this.handlePreview.bind(this)}
            onChange={this.handleChange.bind(this)}
            multiple={true}
            data={folderData}
          >
            {fileList.length >= 10 ? null : <UploadBtn/>}
          </Upload>
          {/*预览图片*/}
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </div>
      </div>
    )
  }
  componentDidMount () {
    // 获取文件夹图片
    this.props.get_folders()
  }
}

function mapStateToProps(state) {
  return {
    folders: state.folders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_folders: bindActionCreators(get_folders, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(UploadPage)
