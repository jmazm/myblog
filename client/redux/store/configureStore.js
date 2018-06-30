/**
 * redux: 是一个可预测的状态容器
 * // ===
 * action - 用来描述发生了什么
 * reducer - 把state和action串联起来，返回新的state
 * === //
 *
 * // ===
 * 1. 三大原则： 单一数据源、状态是只读的、状态修改均由纯函数组成
 * 2. reducer：负责相应action并修改数据 - 定义计算规则
   2.1 reducer 本质上是一个函数： reducer(previousState, action) => newState，根据 previousState 和 action 计算出新的 newState
   2.2 initialState：提供reducer在执行第一次时的默认state
 * 3. 根据计算规则生成store：createStore(reducer)
 * 4. 定义数据（state）变化后的派发规则：store.subscribe(() => {store.getState()})
 * 5. 触发数据变化：store.dispatch({type: ...})
 * 6. 核心api
   6.1 createStore(reducers[, initialState])：创建store
   6.2 store.getState()：获取store中的当前状态
   6.3 store.dispatch(action)：分发一个acition，并且返回这个action, 这是唯一能改变 store 中数据的方式
   6.4 store.subscribe(listener)：注册一个监听者，它在store发生变化时被调用
 *
 *
 * === //
 */


import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware  from 'redux-saga'

import rootReducer from '../reducer'
import rootSaga from '../../sagas'

const middlewares = []
const sagaMiddleware = createSagaMiddleware()

let storeEnhancers =
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ?  // 开发环境 + 客户端
      compose (
      applyMiddleware(...middlewares, sagaMiddleware)
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : // 开发环境 + 后端 || 生产环境
      compose(
        applyMiddleware(...middlewares, sagaMiddleware)
      )

export default function configureStore (initialStore = {}) {
  const store = createStore(
    rootReducer,
    initialStore,
    storeEnhancers
  )

  sagaMiddleware.run(rootSaga)

  return store
}