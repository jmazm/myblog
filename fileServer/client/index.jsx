import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import RouterMap from './router'
import configureStore from './redux/store'

// import './reset.css'

const store = configureStore()


import './reset.css'
import 'antd/dist/antd.css'

ReactDOM.render(
  <Provider store={store}>
    <RouterMap/>
  </Provider>,
  document.getElementById('root')
);