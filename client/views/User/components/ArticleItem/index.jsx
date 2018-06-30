import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import  style from './style.css'

class ArticleItem extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }

  render () {
    const { data } = this.props
    const { id, title, date, imgSrc, foreword, Tag_id, Tag_name, Category_id, Category_name } = data

    return (
      <article className={ style['article-item'] }>
        <div className="article-item-inner">
          <header className={ style['article-header'] }>
            <h2 className={ style['article-title'] }><Link to={`/article/${id}`}>{title}</Link></h2>
            <div className={ style['article-time'] }><i className={ style['calendar'] }></i>{dateFormat(date, 'yyyy/mm/dd ddd')}</div>
          </header>
          <div className="article-main">
            {
              imgSrc ?
                <a className={ style['article-img-link'] } href={`/article/${id}`}>
                  <img className={ style['article-img'] } src={imgSrc}/>
                </a> :
                null
            }
            {
              foreword ?
                <section className={ style['article-foreword'] }>
                  <strong>前言</strong>&nbsp;&nbsp;{foreword}
                </section> :
                null
            }
          </div>
          <footer className={ style['article-tag-list'] }>
            所属：<a href={`/category/${Category_name}/article`} className={ style['tag-item'] }>{ Category_name }</a><a href={`/tag/${ Tag_name }/article`} className={ style['tag-item'] }>{ Tag_name }</a>
          </footer>
        </div>
      </article>
    )
  }
}

module.exports = ArticleItem