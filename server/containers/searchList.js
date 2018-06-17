import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'

import configureStore from '../../client/redux/store/configureStore'
import SearchPage from '../../client/views/User/containers/SearchPage'
import layout from '../view/layout'

import articleModel from '../models/article'

export async function index (ctx) {
  const title = ctx.params.title

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const ret = await articleModel.getByTitle(decodeURIComponent(title), 1, 10)

      const store = configureStore({
        articles:  {
          articleList: ret.articles,
          total: ret.total
        }
      });

      const html = layout(renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <SearchPage/>
          </StaticRouter>
        </Provider>
      ), store.getState())
      
      ctx.body = html
      break

    case 'json':
      let callBackData = {
        'status': 200,
        'message': '这是搜索页面',
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

