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