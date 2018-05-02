import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import SideBar from '../../component/sidebar'
import FolderSelect from '../../component/folderSelect'
import ImgList from '../../component/imgList'
import {actions as ImgActions} from '../../redux/reducer/imgReducer'
import {actions as FolderActions} from '../../redux/reducer/folderReducer'

import './style.css'

const {get_imgs} = ImgActions
const {get_folders} = FolderActions

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idFolder: 0,
      imgs: []
    }
  }

  /**
   * 文件夹选择
   */
  onSelectChange (e) {
    this.props.get_imgs(e.target.value)
  }
  render () {
    const {imgs, folders} = this.props
    return (
      <div className="wrapper img--management">
        <SideBar/>
        <div className="content">
          <h2 className="content-title">图片库</h2>
          <div className="select-wrapper">
            文件夹：<FolderSelect data={folders} onChange={this.onSelectChange.bind(this)}/>
          </div>
          <div className="content-inner">
            <div className="img-wrapper">
              {
                imgs.length > 0 ?
                  <ImgList data={imgs}/> :
                  <div>暂无图片！</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    // 初始化
    this.props.get_imgs(1)
    // 获取文件夹图片
    this.props.get_folders()
  }
}
function mapStateToProps(state) {
  return {
    imgs: state.imgs,
    folders: state.folders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_imgs: bindActionCreators(get_imgs, dispatch),
    get_folders: bindActionCreators(get_folders, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
