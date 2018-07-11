/**
 * 异步
 * // ===
 * 1. html属性 async 和defer
   defer：是在html解析完之后才会执行，如果是多个，按照加载的顺序依次执行
   async：在加载完成后立即执行，如果是多个，执行顺序和加载顺序有关
 * 2. 回调函数 - 回调函数是异步实现的一种方式，比如fs读取文件
 * 3. promise - 就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果，它会提供api，让开发者可以处理
 * 4. generator
 * 5. async/await
   5.1 介绍
     async/await是基于Promise实现的，它不能用于普通的回调函数。
     async/await与Promise一样，是非阻塞的。
     async/await使得异步代码看起来像同步代码。
 * === //
 */

import { take, call, put } from 'redux-saga/effects'
import { getRequest, api } from '../fetch/fetch'
import { actionTypes as GlobalActionTypes } from '../redux/reducer/globalReducer'
import { actionTypes as CommentActionTypes } from '../redux/reducer/commentReducer'

/**
 * 获取评论（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getComments () {
  // 开始请求
  yield put({
      type: GlobalActionTypes.FETCH_START
  })

  try {
    return yield call(getRequest, api.getCommentsApi)
  } catch (err) {
    // 发生错误，就设置全局提醒
    yield put({
      type: GlobalActionTypes.SET_MESSAGE,
      msgType: 0,
      msgInfo: err.message
    })
  } finally {
    // 异步请求结束
    yield put({
      type: GlobalActionTypes.FETCH_END
    })
  }
}

export function* getCommentsFlow () {
  while (true) {
    yield take(CommentActionTypes.GET_ALL_COMMENTS)

    // 拿回来的响应
    let res = yield call(getComments)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: CommentActionTypes.SET_COMMENTS,
        data: res.data
      })
    } else {
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 0,
        msgInfo: res.message
      })
    }
  }
}