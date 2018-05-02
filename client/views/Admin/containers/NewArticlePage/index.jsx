import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import dateformat from 'dateformat'
import Cookies from 'js-cookie'

import {Validator, reg} from '../../../../lib/verification'


import AdminNav from '../../components/AdminNav'
import AdminHeader from '../../components/AdminHeader'
import TagSelect from '../../components/TagSelect'
import CategorySelect from '../../components/CategorySelect'

import {actions as articleActions} from '../../../../redux/reducer/articleReducer'
import {actions as tagActions} from '../../../../redux/reducer/tagReducer'
import {actions as categoryActions} from '../../../../redux/reducer/categoryReducer'
import './style.css'


// action creator
const {get_all_tags} = tagActions
const {get_all_categories} = categoryActions
const {update_content, update_foreword, update_showed_img_url, update_category, update_tag, update_title, save_article} = articleActions

class AdminNewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Tag_id: 1,
      Category_id: 1
    }
  }
  // 正文内容
  contentOnChange (e) {
    this.props.update_content(e.target.value)
  }

  // 标题
  titleOnChange (e) {
    this.props.update_title(e.target.value)
  }

  // 前言
  forewordOnChange (e) {
    this.props.update_foreword(e.target.value)
  }
  // 列表展示的图片
  imgUrlOnChange (e) {
    this.props.update_showed_img_url(e.target.value)
  }

  // 标签
  tagOnChange (tagId) {
    this.setState({
      Tag_id: tagId
    })
    this.props.update_tag(tagId)
  }
  // 类型
  categoryOnChange (categoryId) {
    this.setState({
      Category_id: categoryId
    })
    this.props.update_category(categoryId)
  }

  validate (form) {
    const v = new Validator()
    console.log(form)
    v.add(form.title, [
      {
        strategy: 'isEmpty',
        errorMsg: '标题不能为空'
      }
    ])

    v.add(form.foreword, [
      {
        strategy: 'isEmpty',
        errorMsg: '前言不能为空'
      }
    ])

    if (form.imgSrc.value.trim().length > 0) {
      v.add(form.imgSrc, [
        {
          strategy: 'isWebsite',
          errorMsg: '网址格式不正确'
        }
      ])
    }

    v.add(form.content, [
      {
        strategy: 'isEmpty',
        errorMsg: '内容不能为空'
      }
    ])
    const errMsg = v.start()
    return errMsg
  }

  // 发表
  publishArticle () {
    // 表单验证
    const errMsg = this.validate(this.form)

    if (errMsg) {
      alert(errMsg)
      return
    }

    let articleData = {}

    articleData.title = reg.replaceHtml(this.props.newArticleData.title)
    articleData.content = reg.replaceHtml(this.props.newArticleData.content)
    articleData.foreword = reg.replaceHtml(this.props.newArticleData.foreword)

    articleData.Tag_id = this.state.Tag_id
    articleData.Category_id = this.state.Category_id
    articleData.imgSrc = this.props.newArticleData.imgSrc
    articleData.date = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
    articleData.isPublished = 1
    articleData.Admin_id = 1
    
    console.log(articleData)

    const csrfToken = Cookies.get('CSRF_TOKEN')
    const accessToken = localStorage.getItem('ACCESS_TOKEN')

    // 发送请求
    this.props.save_article({
      articleData,
      csrfToken,
      accessToken
    })
  }

  clearContent () {
    const form = this.form

    form.title.value = ''
    form.imgSrc.value = ''
    form.foreword.value = ''
    form.content.value = ''
  }
  render () {
    const {tags, categories} = this.props
    return (
      <div className="blog-management">
        <AdminNav/>
        <div className="blog-management-content">
          <AdminHeader title="发表文章"/>
          <form className="publish-article" id="newArticleForm" ref={ele => this.form = ele}>
            <div className="article-item-wrapper">
              <span className="article-item-ti">标题</span>
              <input className="input" name="title" value={this.props.newArticleData.title} placeholder="请输入文章标题" onChange={this.titleOnChange.bind(this)}/>
            </div>
            <div className="article-item-wrapper">
              <span className="article-item-ti">文章前言</span>
              <input className="input"  name="foreword" value={this.props.newArticleData.foreword} placeholder="请输入文章前言" onChange={this.forewordOnChange.bind(this)}/>
            </div>
            <div className="article-item-wrapper">
              <span className="article-item-ti">文章展示的图片</span>
              <input className="input" name="imgSrc" value={this.props.newArticleData.imgSrc} placeholder="请输入文章展示图片的地址" onChange={this.imgUrlOnChange.bind(this)}/>
            </div>
            <div className="article-item-wrapper">
              <span className="article-item-ti">文章类别</span>
              <CategorySelect value={this.props.newArticleData.Category_id} data={categories} onChange={this.categoryOnChange.bind(this)}/>
            </div>
            <div className="article-item-wrapper">
              <span className="article-item-ti">文章标签</span>
              <TagSelect value={this.props.newArticleData.Tag_id}  data={tags} onChange={this.tagOnChange.bind(this)}/>
            </div>
            <div className="article-item-wrapper">
              <span className="article-item-ti">正文</span>
              <textarea className="textarea" name="content" value={this.props.newArticleData.content} onChange={this.contentOnChange.bind(this)}></textarea>
            </div>
            <div className="btn-wrapper">
              <button type="button" className="btn" onClick={this.publishArticle.bind(this)}>发布</button>
              <button type="button" className="btn" onClick={this.clearContent.bind(this)}>清空</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount () {
    // 获取所有标签
    this.props.get_all_tags()
    // 获取所有类别
    this.props.get_all_categories()
  }
}

AdminNewArticle.defaultProps = {
  tags: [],
  categories: [],
  newArticleData: {}
};

AdminNewArticle.propTypes = {
  newArticleData: PropTypes.object,
  tags: PropTypes.array,
  categories: PropTypes.array,
};

function mapStateToProps(state) {
  // const {title, content, Tag_id, Category_id, foreword, imgSrc} = state.articles.newArticleData;
  return {
    newArticleData: state.articles.newArticleData,
    tags: state.tags,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    update_tag: bindActionCreators(update_tag, dispatch), // ƒ () {return dispatch(actionCreator.apply(undefined, arguments));}
    update_title: bindActionCreators(update_title, dispatch),
    update_showed_img_url: bindActionCreators(update_showed_img_url, dispatch),
    update_foreword: bindActionCreators(update_foreword, dispatch),
    update_content: bindActionCreators(update_content, dispatch),
    update_category: bindActionCreators(update_category, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch),
    get_all_categories: bindActionCreators(get_all_categories, dispatch),
    save_article: bindActionCreators(save_article, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AdminNewArticle)