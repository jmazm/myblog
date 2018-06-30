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

      // 如果要使用react 同构，那么，所传的参数state的值必须与相应模块的initialState一致
      // 比如：文章模块的initialState，由于首页需要的是文章列表数据，因此，就要按照以下的格式去传递文章列表的数据
      /**
       const initialState = {
          articleList: [], // 文章列表
          articleDetail: {}, // 文章细节
          currentPage: 1, // 当前页
          total: 0, // 文章总数
          newArticleData: {
            title: '', // 文章标题
            content: '', // 文章内容
            Tag_id: 1, // 文章标签
            Category_id: 1, // 文章类别
            id: '', // 文章ID
            imgSrc: '', // 文章列表要展示的图片地址
            foreword: '' // 文章前言
          }
        }
       */
      const store = configureStore({
        articles:  {
          articleList: articles,
          total: total
        }
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

