import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Input, Button, Modal, Table, Divider} from 'antd'
import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'

// import {api} from '../../../../fetch/fetch'
import {actions as categoryActions} from '../../../../redux/reducer/categoryReducer'

const {get_all_categories, add_category} = categoryActions

class AdminCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      category: ''
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '类别名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: this.handerRender
    }
  ]

  handerRender (o, row, index) {
    return (
      <span>
        <a href="javascript:;">删除</a>
        <Divider type="vertical" />
        <a href="javascript:;">修改</a>
      </span>
    )
  }
  handleChange (e) {
    this.setState({
      category: e.target.value
    })
  }
  showModal () {
    this.setState({
      visible: true
    });
  }
  async handleOk () {
    await this.props.add_category(this.state.category)

    this.setState({
      visible: false
    });

    await this.props.get_all_categories()
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

  render () {
    const {categories} = this.props
    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理类别"/>
          <div className="content-inner">
            <div>
              <Button type="primary" onClick={this.showModal}>添加类别</Button>
              <Modal
                title="添加类别"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Input placeholder="类别名称" onChange={this.handleChange} id="category-input"/>
              </Modal>
            </div>
            <div>
              <Table dataSource={this.handleData(categories)} columns={this.columns} pagination={{defaultPageSize: 50}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.get_all_categories()
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_categories: bindActionCreators(get_all_categories, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    add_category: bindActionCreators(add_category, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminCategory)