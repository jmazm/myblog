import { take, call, put, select } from 'redux-saga/effects'
import { getRequest, postRequest, putRequest, api } from '../fetch/fetch'
import { actionTypes as IndexActionTypes } from '../redux/reducer'
import { actionTypes as CommentActionTypes } from '../redux/reducer/commentReducer'

/**
 * 获取评论（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getComments () {
  // 开始进行异步请求
  yield put({
    type: IndexActionTypes.FETCH_START
  })
  try {
    return yield call(getRequest, api.getCommentsApi)
  } catch (err) {
    // 报错处理
    yield put({
      type: IndexActionTypes.SET_MESSAGE,
      msgContent: '网络请求错误',
      msgType: 0
    })
  } finally {
    // 异步请求结束
    yield put({
      type: IndexActionTypes.FETCH_END
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
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}