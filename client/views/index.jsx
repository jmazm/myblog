import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { AppContainer } from 'react-hot-loader';

import {AdminRouteMap, UserRouteMap} from '../router/index'
import configureStore from '../redux/store/index'

import '../static/font-awesome-4.7.0/css/font-awesome.min.css'
import 'antd/dist/antd.min.css'
import './reset.css'

import common from '../../config'

const renderRoot = () => {
  if (window.location.port === common.server.indexServerPort || !window.location.port) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={configureStore}>
          <UserRouteMap/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  } else if (window.location.port === common.server.cmsServerPort || window.location.port == 442) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={configureStore}>
          <AdminRouteMap/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  }
}

renderRoot()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(() => renderRoot());
}





