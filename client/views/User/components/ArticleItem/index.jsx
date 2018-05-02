import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'

import './style.css'

class ArticleItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {data} = this.props
    const {id, title, date, imgSrc, forword, Tag_id, Tag_name, Category_id, Category_name} = data

    return (
      <article className="article-item">
        <div className="article-inner">
          <h2 className="article-title"><Link to={`/article/${id}`}>{title}</Link></h2>
          <div className="article-time">
            <span>{dateFormat(date, 'yyyy/mm')}</span>
            <span>{dateFormat(date, 'dd')}&nbsp;&nbsp;{dateFormat(date, 'ddd')}</span>
          </div>
          {
            imgSrc ?
              <a className="article-link" href={`/article/${id}`}>
                <img className="article-img" src={imgSrc}/>
              </a> :
              null
          }
          {
            forword ?
              <section className="article-content">
                前言&nbsp;{forword}
              </section> :
              null
          }

          <footer className="article-tag-list">
            所属：<a href={`/category/${Category_id}/article`} className="tag-item">{Category_name}</a><a href={`/tag/${Tag_id}/article`} className="tag-item">{Tag_name}</a>
          </footer>
        </div>
      </article>
    )
  }
}

module.exports = ArticleItem