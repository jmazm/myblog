import React, { Component } from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import TagSelect from '../TagSelect'
import CategorySelect from '../CategorySelect'

import style from '../../containers/NewArticlePage/style.css'

class EditorArticle extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate
  }

  render () {
    const { articleData, categories, tags, handleCategoryChange, handleChange, handleTagChange } = this.props

    return (
      <form id="articleEditForm">
        <div>
          <label className={ style["article-item-ti"] }>文章标题：</label>
          <input className={ style["input"] } value={ articleData.title || '' } name="title" onChange={ handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章前言：</label>
          <input className={ style["input"] } value={ articleData.foreword || '' } name="foreword" onChange={ handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章展示的图片：</label>
          <input className={ style["input"] } value={ articleData.imgSrc || '' } name="imgSrc" onChange={ handleChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章类别：</label>
          <CategorySelect value={ articleData.Category_id || 1 } data={ categories } onChange={ handleCategoryChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章标签：</label>
          <TagSelect value={ articleData.Tag_id || 1 }   data={ tags } onChange={ handleTagChange }/>
        </div>
        <div>
          <label className={ style["article-item-ti"] }>文章内容：</label>
          <textarea className={ style["textarea"] } value={ articleData.content || '' } name="content" onChange={ handleChange }></textarea>
        </div>
      </form>
    )
  }
}

module.exports = EditorArticle