import React, {Component} from 'react'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'
// import {, Route, Switch} from 'react-router-dom'

import HOME from '../views/User/containers/Home'
import ArticleDetailPage from '../views/User/containers/ArticleDetailPage'
import Category from '../views/User/containers/CategoryPage'
import Tag from '../views/User/containers/TagPage'
import Demo from '../views/User/containers/DemoPage'
import Message from '../views/User/containers/MessagePage'
import NotFound from '../views/NotFound'
import AdminNewArticlePage from '../views/Admin/containers/NewArticlePage'
import AdminArticlePage from '../views/Admin/containers/ArticlePage'
import AdminCategoryPage from '../views/Admin/containers/CategoryPage'
import AdminTagPage from '../views/Admin/containers/TagPage'

const AdminRouteMap = () => {
  return  (
    <HashRouter>
      <Switch>
        <Route path="/admin/newArticle" component={AdminNewArticlePage}/>
        <Route path="/admin/article" component={AdminArticlePage}/>
        <Route path="/admin/category" component={AdminCategoryPage}/>
        <Route path="/admin/tag" component={AdminTagPage}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </HashRouter>
  )
}


const UserRouteMap = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact  path="/" component={HOME}/>
        <Route path="/article/:articleId" component={ArticleDetailPage}/>
        <Route path="/category/:id/article" component={Category}/>
        <Route path="/tag/:id/article" component={Tag}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/message" component={Message}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

const AllRouterMap = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact  path="/" component={HOME}/>
        <Route path="/article/:articleId" component={ArticleDetailPage}/>
        <Route path="/category/:id/article" component={Category}/>
        <Route path="/tag/:id/article" component={Tag}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/message" component={Message}/>
        <Route path="/404" component={NotFound}/>
        <Route path="/admin/newArticle" component={AdminNewArticlePage}/>
        <Route path="/admin/article" component={AdminArticlePage}/>
        <Route path="/admin/category" component={AdminCategoryPage}/>
        <Route path="/admin/tag" component={AdminTagPage}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}


export {
  UserRouteMap,
  AdminRouteMap,
  AllRouterMap
}
