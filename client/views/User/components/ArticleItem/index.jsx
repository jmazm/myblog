import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.css'

class ArticleItem extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
  }
  render () {
    const {data} = this.props
    const {id, title, date, imgSrc, foreword, Tag_id, Tag_name, Category_id, Category_name} = data

    return (
      <article className="article-item">
        <div className="article-item-inner">
          <header className="article-header">
            <h2 className="article-title"><Link to={`/article/${id}`}>{title}</Link></h2>
            <div className="article-time"><i className="fa fa-calendar"></i>{dateFormat(date, 'yyyy/mm/dd ddd')}</div>
          </header>
          <div className="article-main">
            {
              imgSrc ?
                <a className="article-img-link" href={`/article/${id}`}>
                  <img className="article-img" src={imgSrc}/>
                </a> :
                null
            }
            {
              foreword ?
                <section className="article-foreword">
                  <strong>前言</strong>&nbsp;&nbsp;{foreword}
                </section> :
                null
            }
          </div>
          <footer className="article-tag-list">
            所属：<a href={`/category/${Category_name}/article`} className="tag-item">{Category_name}</a><a href={`/tag/${Tag_name}/article`} className="tag-item">{Tag_name}</a>
          </footer>
        </div>
      </article>
    )
  }
}

module.exports = ArticleItem