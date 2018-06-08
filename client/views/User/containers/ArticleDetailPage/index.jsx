import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import remarkRender from 'remark-react'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import Comment from '../../components/Comment'

import {actions as articleAction} from '../../../../redux/reducer/articleReducer'
import {actions as tagAction} from '../../../../redux/reducer/tagReducer'

import './style.css'

const {get_article_detail} = articleAction
const {get_all_tags} = tagAction

class ArticleDetail extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    const {articleDetail} = this.props
    const {id, title, date, content, Tag_id, Category_id, visitTotal, commentTotal} = articleDetail
    let idCategory
    let CategoryName
    let idTag
    let TagName

    if (Tag_id) {
      idTag = Tag_id.id
      TagName = Tag_id.name
    }
    if (Category_id) {
      idCategory = Category_id.id
      CategoryName = Category_id.name
    }

    return (
      <div className="container my--blog">
        <Header/>
        <div className="main">
          {/*<SearchBar/>*/}
          <div className="main-inner">
            <article className="article-detail">
              <header className="article-header">
                <h1 className="article-title">{title}</h1>
              </header>
              <main className="article-content">
                <ul className="article-meta-list">
                  <li className="meta-list-item">时间：<time>{dateFormat(date, 'yyyy-mm-dd dddd')}</time></li>
                  <li className="meta-list-item">作者：<span>{"张静宜"}</span></li>
                  <li className="meta-list-item">阅读：<span>{visitTotal}</span></li>
                  <li className="meta-list-item">评论：<span>{commentTotal}</span></li>
                  <li className="meta-list-item">分类：<a href="#">{CategoryName}</a> / <a href="#">{TagName}</a></li>
                </ul>
                <section className="article-content">
                  {remark().use(remarkRender).processSync(content).contents}
                </section>
              </main>
              <footer className="article-footer">
                <section className="article-copyright">
                  <p>转载请务必注明出处，欢迎分享！</p>
                </section>
              </footer>
            </article>
            <Comment Article_id={id}/>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    const id = this.props.match.params.articleId
    this.props.get_article_detail(id)
    this.props.get_all_tags()
  }
}

// 设置默认值

ArticleDetail.defaultProps = {
  articleDetail: {},
  tags: []
}

ArticleDetail.propTypes = {
  articleDetail: PropTypes.object,
  tags: PropTypes.array,
}

function mapStateToProps(state) {
  const {articleDetail} = state.articles
  return {
    articleDetail,
    tags: state.tags
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_article_detail: bindActionCreators(get_article_detail, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail)