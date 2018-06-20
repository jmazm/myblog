import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropsType from 'prop-types'

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'

import Modal from '../../../../plugin/modal'
import Table from '../../../../plugin/table'

import { actions as categoryActions } from '../../../../redux/reducer/categoryReducer'

const { get_all_categories, add_category, delete_category } = categoryActions

class AdminCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      category: ''
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderModalContent = this.renderModalContent.bind(this)
  }

  /**
   * 表格头部数据
   * @type {[null,null,null]}
   */
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
      // 必须在这里绑定this才可以，在constructor里绑定无效
      render: this.handleRender.bind(this)
    }
  ]

  /**
   * 处理删除
   * @param id
   */
  handleDel (id) {
    this.props.delete_category(id)
  }

  /**
   * 处理表格数据渲染
   * @param row
   * @return {XML}
   */
  handleRender (row) {
    return (
      <span>
        <a href="javascript:;" onClick={() => this.handleDel(row.id)}>删除</a>
        <a href="javascript:;">修改</a>
      </span>
    )
  }

  /**
   * 处理表单数据
   * @param e
   */
  handleChange (e) {
    this.setState({
      category: e.target.value
    })
  }

  /**
   * 展示模态框
   */
  showModal () {
    this.setState({
      visible: true
    });
  }

  /**
   * 模态框确认
   * @return {Promise.<void>}
   */
  async handleOk () {
    const { category } = this.state
    await this.props.add_category(category)
    
    console.log(this.props.globalState)

    this.setState({
      visible: false
    });

    await this.props.get_all_categories()
  }

  /**
   * 模态框取消
   */
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
      <input type="text" placeholder="类别名称" onChange={ this.handleChange }  id="category-input"/>
    )
  }
  render () {
    const { categories } = this.props

    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理类别"/>
          <div className="content-inner">
            <button type="button" onClick={ this.showModal }>添加类别</button>
            <Table dataSource={ this.handleData(categories) } columns={ this.columns } pagination={ false }/>
            <Modal
              title="添加类别"
              visible={ this.state.visible }
              onOk={ this.handleOk }
              onCancel={ this.handleCancel }
              content={ this.renderModalContent() }
            />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.get_all_categories()
  }
}

AdminCategory.defaultProps = {
  categories: []
}

AdminCategory.propTypes = {
  categories: PropsType.array
}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    globalState: state.globalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_categories: bindActionCreators(get_all_categories, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    add_category: bindActionCreators(add_category, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    delete_category: bindActionCreators(delete_category, dispatch) // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminCategory)