import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware  from 'redux-saga'
import rootReducer from '../reducer'
import rootSaga from '../../saga'

const __window = window
const sagaMiddleware = createSagaMiddleware()
const middlewares = []

let storeEnhancers

if (process.env.NODE_ENV === 'production') {

} else {
  storeEnhancers = compose(
    applyMiddleware(...middlewares, sagaMiddleware),
    (__window && __window.devToolsExtension) ?  __window.devToolsExtension() : (f) => f
  )
}

export default function configureStore (initialState={}) {
  const store = createStore(rootReducer, initialState, storeEnhancers)
  sagaMiddleware.run(rootSaga)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept( () => {
      const nextRootReducer = require('../reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store
}
