import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'

import configureStore from '../../client/redux/store/configureStore'
import ArticleDetailPage from '../../client/views/User/containers/ArticleDetailPage'
import layout from '../view/layout'
import config from '../../config'

import articleModel from '../models/article'

export async function index (ctx) {
  const articleId = ctx.params.articleId

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const ret = await articleModel.getById(articleId)
      let prefix = config.prod.fileServerIP

      if(process.env.NODE_ENV === 'development') {
        prefix = config.dev.fileServerIP
      }

      ret.content = ret.content.replace(/\!\[(.*?)\]\((.*?)\)/g, `![$1](${prefix}$2)`)

      const article = {
        articleDetail: {
          content: ret.content,
          title: ret.title
        }
      }

      const store = configureStore({
        articles: article
      });

      const html = layout(renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <ArticleDetailPage/>
          </StaticRouter>
        </Provider>
      ), store.getState())

      ctx.body = html
      break

    case 'json':
      let callBackData = {
        'status': 200,
        'message': '这个是详情页',
        'data': {}
      }
      ctx.body = callBackData
      break

    default: {
      // allow json and html only
      ctx.throw(406, 'allow json and html only');
      return;
    }
  }
}

