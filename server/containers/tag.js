import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'


import configureStore from '../../client/redux/store/configureStore'
import TagPage from '../../client/views/User/containers/TagPage'
import layout from '../view/layout'

import tagModel from '../models/tag'

export async function index (ctx) {

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const tags = await tagModel.get()

      const store = configureStore({
        tags: tags
      });

      const html = layout(renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <TagPage/>
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

