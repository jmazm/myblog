import React, {Component} from 'react'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'

import HOME from '../views/User/containers/Home'
import ArticleDetailPage from '../views/User/containers/ArticleDetailPage'
import CategoryPage from '../views/User/containers/CategoryPage'
import TagPage from '../views/User/containers/TagPage'
import Demo from '../views/User/containers/DemoPage'
import Message from '../views/User/containers/MessagePage'
import ArticleListByTagPage from '../views/User/containers/ArticleListByTagPage'
import ArticleListByCategoryPage from '../views/User/containers/ArticleListByCategoryPage'
import SearchPage from '../views/User/containers/SearchPage'

import NotFound from '../views/NotFound'

import AdminNewArticlePage from '../views/Admin/containers/NewArticlePage'
import AdminArticlePage from '../views/Admin/containers/ArticlePage'
import AdminCategoryPage from '../views/Admin/containers/CategoryPage'
import AdminTagPage from '../views/Admin/containers/TagPage'
import LoginPage from '../views/Admin/containers/LoginPage'


const AdminRouteMap = () => {
  return  (
    <HashRouter>
      <Switch>
        <Route path="/admin/newArticle" component={AdminNewArticlePage}/>
        <Route path="/admin/login" component={LoginPage}/>
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
        <Route exact  path="/category" component={CategoryPage}/>
        <Route exact path="/tag" component={TagPage}/>
        <Route path="/tag/:tag/article" component={ArticleListByTagPage}/>
        <Route path="/category/:category/article" component={ArticleListByCategoryPage}/>
        <Route path="/search/:title" component={SearchPage}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/message" component={Message}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

export {
  UserRouteMap,
  AdminRouteMap
}

