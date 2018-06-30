// === 高阶 reducer：将 reducer 作为参数或者返回值的函数 === //

// === combineReducers：把顶层的 reducer 拆分成多个小的 reducer，分别独立地操作 state 树的不同部分 === //
import { combineReducers } from 'redux'
import { reducer as tags } from './tagReducer'
import { reducer as categories } from './categoryReducer'
import { reducer as articles } from './articleReducer'
import { reducer as comments } from './commentReducer'
import { reducer as global } from './globalReducer'

export default combineReducers({
  articles,
  tags,
  categories,
  comments,
  globalState: global
})