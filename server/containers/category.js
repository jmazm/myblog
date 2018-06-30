import React from 'react'
import{ renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider }  from 'react-redux'


import configureStore from '../../client/redux/store/configureStore'
import CategoryPage from '../../client/views/User/containers/CategoryPage'
import layout from '../view/layout'

import categoryModel from '../models/category'

export async function index (ctx) {

  switch (ctx.accepts('json', 'html')) {
    case 'html':
      const categories = await categoryModel.get()
      

      const store = configureStore({
        categories: categories
      });

      const html = layout(renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <CategoryPage/>
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

