import {createStore,applyMiddleware, compose} from 'redux'
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