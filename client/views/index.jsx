import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// === Provider组件：帮助 Redux 和 React 进行绑定，并接受一个 store props, 是整个 Redux 应用的顶层组件 === //
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import { AdminRouteMap, UserRouteMap } from '../router/index'
import configureStore from '../redux/store/index'

import './reset.css'

import common from '../../config'

const renderRoot = () => {
  if (window.location.port === common.server.indexServerPort || /blog\.jmazm\.com/.test(location.href)) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={ configureStore }>
          <UserRouteMap/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  } else if (window.location.port === common.server.cmsServerPort || /admin\.jmazm\.com/.test(location.href)) {
    ReactDOM.render(
      <AppContainer>
        <Provider store={ configureStore }>
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





