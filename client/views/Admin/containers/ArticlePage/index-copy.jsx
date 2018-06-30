import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import Table from '../../../../plugin/table'

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import EditorArticle  from '../../components/EditorArticle'

import { actions as articleReducer } from '../../../../redux/reducer/articleReducer'
import { actions as tagReducer } from '../../../../redux/reducer/tagReducer'
import { actions as categoryReducer } from '../../../../redux/reducer/categoryReducer'

const { get_all_articles, delete_an_article, modify_article } = articleReducer
const { get_all_tags } = tagReducer
const { get_all_categories } = categoryReducer

class AdminArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pageNum: 1,
      pageSize: 10,
      // 控制弹框的出现与隐藏
      visble: false,
      curArticleId: 1,
      // 文章数据
      articleData: {
        Tag_id: 1,
        Category_id: 1,
      }
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.handleCancel = this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  static defaultProps = {
    tags: [],
    categories: [],
    articleList: []
  }

  static propTypes = {
    articleList: PropTypes.array,
    tags: PropTypes.array,
    categories: PropTypes.array,
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
      title: '文章名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      // 必须在这里绑定this才可以，在constructor里绑定无效
      render: this.handleRenderOperation.bind(this)
    }
  ]

  /**
   * 表格数据渲染
   * @param o
   * @param row
   * @param index
   * @return {XML}
   */
  handleRenderOperation (row, index) {
    const { pageNum, pageSize } = this.state

    return (
      <span>
        <a href="javascript:;">查看</a>
        <a href="javascript:;" onClick={() => this.handleDel(row.id, pageNum, pageSize)}>删除</a>
        <a href="javascript:;" onClick={() => this.showModal(row.id)}>修改</a>
      </span>
    )
  }

  /**
   * 处理数据，使用与表格数据
   * @param data
   * @return {*}
   */
  handleData (data) {
    for (let item of data) {
      item.key = item.id
    }

    // 不要在render方法内调用this.setState，调用setState方法，就会渲染多1次
    // 将数据存储在本地
    localStorage.setItem('articleList', JSON.stringify({
      data: data
    }))

    return data
  }

  /**
   * 分页插件的配置
   * @param total
   */
  handlePagConfig (total) {

    return {
      defaultPageSize: 10,
      onChange: this.pageOnChange,
      defaultCurrent: 1,
      total: parseInt(total)
    }

  }

  async showModal (id) {
    await this.setState({
      visible: true,
      curArticleId: id
    })
  }

  /**
   * 模态框取消
   */
  handleCancel (){
    this.setState({
      visible: false
    });
  }

  render () {
    const { articleList, total, tags, categories } = this.props
    const { articleData, visible, curArticleId } = this.state

    return (
      <div className="blog-management-wrapper">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理文章"/>
          <div className="content-inner">
            <div>
              <Table
                dataSource={ this.handleData(articleList) }
                columns={ this.columns }
                pagination={ this.handlePagConfig(total) }
              />

              <EditorArticle
                id= { curArticleId }
                visible={ visible }
                categories={ categories }
                tags={ tags }
                handleCancel={ this.handleCancel }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.get_all_articles({
      pageNum: 1,
      pageSize: 10
    })

    this.props.get_all_tags()
    this.props.get_all_categories()
  }

  componentDidUpdate (prevProps) {
    const { msg } = prevProps.globalState

    // 更新完毕，如果遇到type为0，证明未登录或者验证未通过或者后台报错，会主动返回登录界面
    if (msg.type == 0 && msg.info != '') {
      location.href = '/'
    }
  }
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles

  return {
    articleList,
    total,
    tags: state.tags,
    categories: state.categories,
    globalState: state.globalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_articles: bindActionCreators(get_all_articles, dispatch),
    delete_an_article: bindActionCreators(delete_an_article, dispatch),
    get_all_categories: bindActionCreators(get_all_categories, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch),
    modify_article: bindActionCreators(modify_article, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminArticle)