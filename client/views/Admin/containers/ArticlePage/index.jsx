import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import Table from '../../../../plugin/table'
import Modal from '../../../../plugin/modal'

import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import EditorArticle from '../../components/EditorArticle'

import { replaceHtml } from '../../../../lib/xss'

import { actions as ArticleReducer } from '../../../../redux/reducer/articleReducer'
import { actions as tagReducer } from '../../../../redux/reducer/tagReducer'
import { actions as articleReducer } from '../../../../redux/reducer/categoryReducer'

const { get_all_articles, delete_an_article, modify_article } = ArticleReducer
const { get_all_tags } = tagReducer
const { get_all_categories } = articleReducer

class AdminArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pageNum: 1,
      pageSize: 10,
      visble: false, // 控制弹框的出现与隐藏
      // 文章数据
      articleData: {
        Tag_id: 1,
        Category_id: 1,
      },
      a: []
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleData = this.handleData.bind(this)
    this.pageOnChange = this.pageOnChange.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.handlePagConfig = this.handlePagConfig.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
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
   * 分页插件页面变化
   * @param page
   * @param pagesize
   */
  pageOnChange (page, pagesize) {
    const cfg = {
      pageNum: page,
      pageSize: pagesize
    }

    this.props.get_all_articles(cfg)

    // 修改state状态
    this.setState(cfg)
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
   * 删除文章
   * @param id
   * @param pageNum
   * @param pageSize
   */
  handleDel (id, pageNum, pageSize) {
    this.props.delete_an_article(id, pageNum, pageSize)
  }

  /**
   * 表格数据渲染
   * @param o
   * @param row
   * @param index
   * @return {XML}
   */
  handleRenderOperation (row, index) {
    const {pageNum, pageSize} = this.state
    return (
      <span>
        <a href="javascript:;">查看</a>
        <a href="javascript:;" onClick={() => this.handleDel(row.id, pageNum, pageSize)}>删除</a>
        <a href="javascript:;" onClick={() => this.showModal(row.id)}>修改</a>
      </span>
    )
  }

  /**
   * 分页插件的配置
   * @param total
   * @return {{defaultPageSize: number, onChange: AdminArticle.pageOnChange, defaultCurrent: number, total: Number}}
   */
  handlePagConfig (total) {

    const config = {
      defaultPageSize: 10,
      onChange: this.pageOnChange,
      defaultCurrent: 1,
      total: parseInt(total)
    }

    return config
  }

  /**
   * 展示模态框
   */
  showModal (id) {
    this.setState({
      visible: true
    });

    let articleData = {}

    // 从localStorage里取出已存储的文章列表数据
    const articleList = JSON.parse(localStorage.getItem('articleList')).data

    // 找出对应id的文章数据
    for (let item of articleList) {
      if(item.id == id) {
        articleData = item
        break
      }
    }

    this.setState({
      articleData: articleData
    })
  }

  /**
   * 模态框确认 - 确认修改数据
   * @return {Promise.<void>}
   */
  async handleOk () {
    const { articleData, pageSize, pageNum } = this.state
    let postData = {
      articleData: {}
    }

    postData.id = articleData.id

    postData.articleData.title = replaceHtml(articleData.title)
    postData.articleData.foreword = replaceHtml(articleData.foreword)
    postData.articleData.imgSrc = articleData.imgSrc
    postData.articleData.Category_id = articleData.Category_id
    postData.articleData.Tag_id = articleData.Tag_id
    postData.articleData.content = replaceHtml(articleData.content)

    await this.props.modify_article(pageNum, pageSize, postData)

    this.setState({
      visible: false
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

  /**
   * 处理表单change事件
   * @param e
   */
  handleChange (e) {
    const target = e.target
    const name = target.name
    const {articleData} = this.state

    this.setState({
      articleData: Object.assign({}, articleData, {
        [name]: target.value
      })
    })
  }

  /**
   * 处理类别select
   * @param value
   */
  handleCategoryChange (value) {
    const {articleData} = this.state

    this.setState({
      articleData: Object.assign({}, articleData, {
        Category_id: value
      })
    })
  }

  /**
   * 处理标签select
   * @param value
   */
  handleTagChange (value) {
    const { articleData } = this.state

    this.setState({
      articleData: Object.assign({}, articleData, {
        Tag_id: value
      })
    })
  }

  renderModalContent (articleData, categories, tags) {
    return <EditorArticle
      articleData={articleData}
      categories={categories}
      tags={tags}
      handleChange={this.handleChange}
      handleCategoryChange={this.handleCategoryChange}
      handleTagChange={this.handleTagChange}
    />
  }
  render () {
    const { articleList, total, tags, categories } = this.props
    const { articleData, visible } = this.state

    return (
      <div className="blog-management-wrapper blog--management">
        <AdminNav/>
        <div className="management-content-wrapper">
          <AdminHeader title="管理文章"/>
          <div className="content-inner">
            <div>
              <Table
                dataSource={this.handleData(articleList)}
                columns={this.columns}
                pagination={this.handlePagConfig(total)}
              />
            </div>
            <Modal
              title="修改文章"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width="750"
              content={this.renderModalContent(articleData, categories, tags)}
            />
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
}

AdminArticle.defaultProps = {
  tags: [],
  categories: [],
  articleList: []
}

AdminArticle.propTypes = {
  articleList: PropTypes.array,
  tags: PropTypes.array,
  categories: PropTypes.array,
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles
  return {
    articleList,
    total,
    tags: state.tags,
    categories: state.categories
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