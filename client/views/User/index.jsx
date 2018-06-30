import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// === Provider组件：帮助 Redux 和 React 进行绑定，并接受一个 store props, 是整个 Redux 应用的顶层组件 === //
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import { UserRouteMap } from '../../router/index'
import configureStore from '../../redux/store/index'

import '../../static/css/reset.css'
import '../../static/css/index-common.css'

const renderRoot = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ configureStore }>
        <UserRouteMap/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderRoot()

// 只有当开启了模块热替换时 module.hot 才存在
// module.hot 是当开启模块热替换后注入到全局的 API，用于控制模块热替换的逻辑。
if (process.env.NODE_ENV === 'development' && module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept(() => renderRoot());
}





