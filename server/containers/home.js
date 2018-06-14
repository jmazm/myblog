import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'

import configureStore from '../../client/redux/store/configureStore'
import Home from '../../client/views/User/containers/Home'
import layout from '../view/layout'

import articleModel from '../models/article'

export async function index (ctx) {
  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const articles = await articleModel.getAll(1, 10)
      const total = await articleModel.getTotal()

      const store = configureStore({
        articles: articles,
        total: total
      });

      const html = layout(
        renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <Home/>
            </StaticRouter>
          </Provider>
        ), store.getState())

      ctx.body = html
      break

    case 'json':
      let callBackData = {
        'status': 200,
        'message': '这是首页',
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

