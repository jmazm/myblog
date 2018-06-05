import React from 'react'
import{renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider}  from 'react-redux'
import configureStore from '../../client/redux/store/configureStore'
import Home from '../../client/views/User/containers/Home'
import layout from '../view/layout'


export function index (ctx) {
  console.log(ctx.url) 
  switch (ctx.accepts('json', 'html')) {
    case 'html':
    {
      //init store
      // let loginStore = {
      //   user: {
      //     logined: ctx.isAuthenticated()
      //   }
      // };
      // const store = configureStore(loginStore);
      const store = configureStore();
      const html = layout (
        renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <Home/>
            </StaticRouter>
          </Provider>
         ), store.getState());

      ctx.body = html;
    }
      break;
    case 'json':
    {
      let callBackData = {
        'status': 200,
        'message': '这个是主页',
        'data': {}
      };
      ctx.body = callBackData;
    }
      break;
    default:
    {
      // allow json and html only
      ctx.throw(406, 'allow json and html only');
      return;
    }
  }
}

