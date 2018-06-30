import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import TagSelect from '../TagSelect'
import CategorySelect from '../CategorySelect'
import Modal from '../../../../plugin/modal'

import style from '../../containers/NewArticlePage/style.css'
import { actions as articleReducer } from '../../../../redux/reducer/articleReducer'

const { modify_article } = articleReducer

class EditorArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // 文章数据
      articleData: {
        Tag_id: 1,
        Category_id: 1,
      }
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleOk () {
    this.props.handleOk()
  }

  handleCancel () {
    this.props.handleCancel()
  }

  handleChange () {

  }

  renderModalContent (curArticleId, categories, tags) {
    const { title, foreword, imgSrc, Category_id, Tag_id, content } = this.state.articleData

    return (
      <form id="articleEditForm">
        <div>
          <label className={ style["article-item-ti"] }>文章标题：</label>
          <input className={ style["input"] } value={ title } name="title" onChange={ this.handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章前言：</label>
          <input className={ style["input"] } value={ foreword } name="foreword" onChange={ this.handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章展示的图片：</label>
          <input className={ style["input"] } value={ imgSrc || '' } name="imgSrc" onChange={ this.handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章类别：</label>
          <CategorySelect value={ Category_id } data={ categories } onChange={ this.handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章标签：</label>
          <TagSelect value={ Tag_id }   data={ tags } onChange={ this.handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章内容：</label>
          <textarea className={ style["textarea"] } value={ content } name="content" onChange={ this.handleChange }></textarea>
        </div>
      </form>
    )
  }
  render () {
    const { visible, categories, tags, curArticleId } = this.props

    return (
      <Modal
        title="修改文章"
        visible={ visible }
        onOk={ this.handleOk }
        onCancel={ this.handleCancel }
        width="750"
        content={ this.renderModalContent(curArticleId, categories, tags) }
      />
    )
  }
}

function mapStateToProps (state) {
  const {articleList, total} = state.articles

  return {
    articleList,
    total,
    globalState: state.globalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modify_article: bindActionCreators(modify_article, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorArticle)