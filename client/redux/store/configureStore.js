/**
 * redux
 * // ===
 * 1. 设计思想：Web 应用是一个状态机，视图与状态是一一对应的；所有的状态，保存在一个对象里面。
 * 2. 三大原则： 单一数据源、状态是只读的、状态修改均由纯函数组成
 * 3. 基本概念
   3.1 Store - createStore(reducers[, initialState]) - 创建Store
       Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
   3.2 State - store.getState()
       Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
       【一个 State 对应一个 View。只要 State 相同，View 就相同】
   3.3 store.dispatch(obj/action creator) - 是 View 发出 Action 的唯一方法
   3.4 store.subscribe() - 设置监听函数，一旦 State 发生变化，就自动执行这个函数。
   3.5 Action - 是一个对象 - { type: 'xxx' }
       Action 描述当前发生的事情。
       改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store
   3.6 Action Creator - 函数，用来生成 Action
   3.7 Reducer
     3.7.1 作为一个函数，reducer(previousState, action) => newState，根据 previousState 和 action 计算出新的 newState
     3.7.2 Reducer 函数最重要的特征是 - 纯函数 - 只要是同样的输入，必定得到同样的输出
           纯函数的约束：
              不得改写参数；
              不能调用系统 I/O 的API；
              不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果。
     3.7.3 Reducer的拆分 - combineReducers({}) - 将各个 reducer 合成一个大的Reducer
 * === //
 */

/**
 * 工作流程
 * // ===
 * 1. 用户发出Action - store.dispatch(action);
 * 2. Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
 * 3. State 一旦有变化，Store 就会调用监听函数 - store.subscribe(listener)
     listener可以通过store.getState()得到当前状态
 * === //
 */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware  from 'redux-saga'

import rootReducer from '../reducer'
import rootSaga from '../../sagas'

/**
 * 中间件
 * // ===
 * 1. 概念：中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
 * 2. 用法：applyMiddleware + compose
 * === //
 */

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