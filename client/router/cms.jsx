import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import AdminNewArticlePage from '../views/Admin/containers/NewArticlePage'
import AdminArticlePage from '../views/Admin/containers/ArticlePage'
import AdminCategoryPage from '../views/Admin/containers/CategoryPage'
import AdminTagPage from '../views/Admin/containers/TagPage'
import LoginPage from '../views/Admin/containers/LoginPage'
import UserPage from '../views/Admin/containers/UserPage'
import AdminFilePage from '../views/Admin/containers/FilePage'
import NotFound from '../views/NotFound'

// === webpack优化之按需加载：按需加载每个页面的逻辑 === //
// === 1 与React-Router结合：写一个异步加载组件，通过webpack官网中import的用法来引入不同组件 === //
// === 2 output中的chunkFilename: 为动态加载的 Chunk 配置输出文件的名称 === //

// import getAsyncComponent  from './asyncLoad'

export const AdminRouteMap = () => {

  // return  (
  //   <HashRouter>
  //     <Switch>
  //       <Route exact path="/" component={LoginPage}/>
  //       <Route path="/admin/newArticle" component={ getAsyncComponent(
  //         () => import('../views/Admin/containers/NewArticlePage')
  //       ) }/>
  //       <Route path="/admin/article" component={ getAsyncComponent(
  //         () => import('../views/Admin/containers/ArticlePage')
  //       ) }/>
  //       <Route path="/admin/category" component={ getAsyncComponent(
  //         () => import('../views/Admin/containers/CategoryPage')
  //       ) }/>
  //       <Route path="/admin/tag" component={ getAsyncComponent(
  //         () => import('../views/Admin/containers/TagPage')
  //       ) }/>
  //       <Route path="/404" component={NotFound}/>
  //     </Switch>
  //   </HashRouter>
  // )

  return  (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/admin/newArticle" component={ AdminNewArticlePage }/>
        <Route path="/admin/article" component={ AdminArticlePage }/>
        <Route path="/admin/category" component={ AdminCategoryPage }/>
        <Route path="/admin/tag" component={ AdminTagPage }/>
        <Route path="/admin/management" component={ UserPage }/>
        <Route path="/admin/file" component={ AdminFilePage }/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </HashRouter>
  )
}


