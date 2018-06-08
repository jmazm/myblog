import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'


import configureStore from '../../client/redux/store/configureStore'
import ArticleDetailPage from '../../client/views/User/containers/ArticleDetailPage'
import layout from '../view/layout'

import articleModel from '../models/article'

export async function index (ctx) {
  const articleId = ctx.params.articleId

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const ret = await articleModel.getById(articleId)

      const article = {
        articleDetail: {
          ArticleContent: ret.ArticleContent,
          ArticleTitle: ret.ArticleTitle
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
        'message': '这个是主页',
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

