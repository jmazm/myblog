/**
 * redux - 多交互、多数据源适合使用redux
 * // ===
 * 为什么要使用redux？
   在react中，是通过props和state管理数据。如果一个应用比较复杂，那么数据就会变得复杂，难以去管理。所以，我们就需要将数据抽取出来，另外去管理。
 *
 * redux将state抽取出来，将其保存到一个对象中，这个对象称其为Store，可以通过createStore去创建Store对象
 * redux有三大原则：单一数据源（所有数据都只存储在store中），状态是只读的（数据只能读不能修改、删除），使用纯函数来执行修改（纯函数指的就是reducer）
 *
 * 在redux中，通过action去改变state，在我看来，action其实就是指令，告诉store我要改变state了。
 * 那么又是如何获取state？其实是通过reducer去获取。reducer函数接收两个参数，prevState过去的状态和action指令，然后返回新的state。
 *
 * 页面复杂起来，就会有很多模块，而每个模块的action不应该全部集中在一个reducer里，这会使得reducer很臃肿而且难以维护，所以在blog中我就按照不同的模块建立了对应的reducer，
 * 但是store只会接收一个reducer，所以需要通过combineReducers将每个模块的reducer集合起来。
 *
 * 到了实际的交互中，用户其实是通过 store.dispatch(action)，下达指令，告诉store要如何改变state。
 * 这就是通过 redux 的 bindActionCreators(actionCreators, dispatch)函数实现，将actionCreators和dipatch结合起来，当调用对应的actionCreators的时候，就相当于store.dipatch(action)
 *
 * 如何将react和redux结合起来？react-redux就有一个connect方法，其接收 mapStateToProps, mapDispatchToProps 两个函数，
 * mapStateToProps函数主要是建立一个外部的state到组件内部props的映射，我们通常获取数据都不是从state中获取，而是从props中获取
 * mapDispatchToProps函数主要是结合bindActionCreators函数，实现将actionCreator和dipatch结合起来，并将绑定好的方法作为props传给当前组件
 *
   react  ------------------------------>  react-redux  <------------------------------------------ redux
                                            Provider             ====》                store = createStore(reducer, initialState, enhancers)
                          connect(mapStateToProps, mapDipatchToProps)                                         1. 用户发出action：store.dispatch(action) ->
                           |                                                                                       2. store自动调用 reducer(preState, action)，返回new state ->
                           | ------------------------> bindActionCreators(actionCreator, dispatch)                            3. state变化，监听 store.subscribe() ->
                                                                                                                                4. store.getState()

 * === //
 *
 *  * 工作流程
 *  用户通过view层发出action，这个action就会传递给reducer，除此之外，reducer还会接受一个prevState作为参数，reducer就会结合action和prevState计算出新的state
 *  state一旦变化，就会促使store调用监听函数subscribe，并通过调用getState获取到最新的state，从而使view重新渲染
 * // ===
 * 1. 用户发出Action - store.dispatch(action);
 * 2. Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
 * 3. State 一旦有变化，Store 就会调用监听函数 - store.subscribe(listener)，listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
 * === //
 *
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

export default function configureStore (initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    storeEnhancers
  )

  sagaMiddleware.run(rootSaga)

  return store
}