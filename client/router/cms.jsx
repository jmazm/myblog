import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import AdminNewArticlePage from '../views/Admin/containers/NewArticlePage'
import AdminArticlePage from '../views/Admin/containers/ArticlePage'
import AdminCategoryPage from '../views/Admin/containers/CategoryPage'
import AdminTagPage from '../views/Admin/containers/TagPage'
import LoginPage from '../views/Admin/containers/LoginPage'
import NotFound from '../views/NotFound'

export const AdminRouteMap = () => {
  return  (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/admin/newArticle" component={AdminNewArticlePage}/>
        <Route path="/admin/article" component={AdminArticlePage}/>
        <Route path="/admin/category" component={AdminCategoryPage}/>
        <Route path="/admin/tag" component={AdminTagPage}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </HashRouter>
  )
}


