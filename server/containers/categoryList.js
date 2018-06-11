import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'

import configureStore from '../../client/redux/store/configureStore'
import ArticleListByCategoryPage from '../../client/views/User/containers/ArticleListByCategoryPage'
import layout from '../view/layout'

import articleModel from '../models/article'

export async function index (ctx) {
  const categoryName = ctx.params.category

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const ret = await articleModel.getByCategory(decodeURIComponent(categoryName), 1, 10)
      
      console.log(ret)

      const store = configureStore({
        articles: ret.articles,
        total: ret.total
      });

      const html = layout(renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <ArticleListByCategoryPage/>
          </StaticRouter>
        </Provider>
      ), store.getState())
      
      ctx.body = html
      break

    case 'json':
      let callBackData = {
        'status': 200,
        'message': '这是文章类别列表展示',
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

