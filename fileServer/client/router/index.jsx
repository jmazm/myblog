import React, {Component} from 'react'
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from '../container/HomePage'
import UploadPage from '../container/UploadPage'
import FolderPage from '../container/FolderPage'


class RouteMap extends Component {
    constructor (props) {
        super(props)
    }
    render () {
      return (
        <Router>
          <Switch>
            <Route exact  path="/" component={HomePage}/>
            <Route exact  path="/upload" component={UploadPage}/>
            <Route exact  path="/folder" component={FolderPage}/>
          </Switch>
        </Router>
      )
    }
}

module.exports = RouteMap
