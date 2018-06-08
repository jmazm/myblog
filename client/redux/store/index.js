import configureStore from './configureStore';

if (typeof window === 'undefined') {
  global.window = {}
}

const store = configureStore(window.__REDUX_DATA__ || {});

export default store;


