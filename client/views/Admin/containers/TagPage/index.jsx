import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import Table from '../../../../plugin/table'
import Modal from '../../../../plugin/modal'
import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'

import { actions as tagActions } from '../../../../redux/reducer/tagReducer'

const { get_all_tags, add_tag, delete_tag } = tagActions

class AdminTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      tag: ''
    }
    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.renderModalContent = this.renderModalContent.bind(this)
  }

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '标签名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: this.handlerRender.bind(this)
    }
  ]

  handleDel (id) {
    this.props.delete_tag(id)
  }

  handlerRender (row, index) {
    return (
      <span>
        <a href="javascript:;" onClick={() => this.handleDel(row.id)}>删除</a>
        <a href="javascript:;">修改</a>
      </span>
    )
  }
  handleChange (e) {
    this.setState({
      tag: e.target.value
    })
  }
  showModal () {
    this.setState({
      visible: true
    });
  }
  async handleOk () {
    await this.props.add_tag(this.state.tag)

    this.setState({
      visible: false
    });

    await this.props.get_all_tags()
  }
  handleCancel (){
    this.setState({
      visible: false
    });
  }

  /**
   * 处理数据
   * @param data
   * @return {Array.<T>|string|Blob|ArrayBuffer}
   */
  handleData (data) {
    let copyData = data.slice(0)

    for (let item of copyData) {
      item.key = item.id
    }

    return copyData
  }

  renderModalContent () {
    return (
      <input type="text" placeholder="类别名称" onChange={this.handleChange}  id="category-input"/>
    )
  }

  render () {
    const {tags} = this.props
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理标签"/>
          <div className="content-inner">
            <div>
              <button type="button" onClick={this.showModal}>添加标签</button>
            </div>
            <div>
              <Table dataSource={this.handleData(tags)} columns={this.columns} pagination={false}/>
            </div>

            <Modal
              title="添加标签"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              content={this.renderModalContent()}
            />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.get_all_tags()
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_tags: bindActionCreators(get_all_tags, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    add_tag: bindActionCreators(add_tag, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    delete_tag: bindActionCreators(delete_tag, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminTag)