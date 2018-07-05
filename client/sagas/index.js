/**
 * redux-saga 是一个 redux 中间件
 * redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，
 * 捕获到监听的Action后可以派生一个新的任务对state进行维护
 * （当然也不是必须要改变State，可以根据项目的需求设计），
 * 通过更改的state驱动View的变更。
 * // ===
 * 1. 特性：
   1.1 集中处理 redux 副作用问题
   1.2 被实现为 generator
   1.3 类 redux-thunk 中间件
   1.4 watch/worker（监听 --》 执行）的工作形式。
 * 2、Effects
   2.1 Effects 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行
   2.2 在 redux-saga 世界里，所有的 Effect 都必须被 yield 才会执行，并且原则上来说，所有的 yield 后面也只能跟Effect，以保证代码的易测性。
 * 3、阻塞调用和无阻塞调用
   3.1 fork - 无阻塞型调用 - 创建一个子 saga
   3.2 call - 阻塞调用 - 有阻塞地调用 saga 或者返回 promise 的函数
 * 4. redux-saga 和 redux-thunk的区别
   4.1 Sagas 是通过 Generator 函数来创建的，意味着可以用同步的方式写异步的代码；
   4.2 Thunks 是在 action 被创建时才调用，Sagas 在应用启动时就开始调用，监听action 并做相应处理； （通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理）
   4.3 启动的任务可以在任何时候通过手动取消，也可以把任务和其他的 Effects 放到 race 方法里可以自动取消；
 * == //
 */

import { fork } from 'redux-saga/effects'
import { saveTagFlow, getTagsFlow, delTagFlow } from './tagSaga'
import { getCategoriesFlow, saveCategoryFlow, delCategoryFlow } from './categorySaga'
import { getAllArticleFlow, getArticleDetailFlow, saveArticleFlow, deleteArticleByIdFlow, modifyArticleFlow } from './articleSaga'
import { getCommentsFlow } from './commentSaga'

export default function* rootSage () {
  yield fork(getAllArticleFlow)
  yield fork(getArticleDetailFlow)
  yield fork(deleteArticleByIdFlow)
  yield fork(modifyArticleFlow)
  yield fork(saveArticleFlow)
  yield fork(saveTagFlow)
  yield fork(getTagsFlow)
  yield fork(delTagFlow)
  yield fork(getCategoriesFlow)
  yield fork(saveCategoryFlow)
  yield fork(delCategoryFlow)
  yield fork(getCommentsFlow)
}
