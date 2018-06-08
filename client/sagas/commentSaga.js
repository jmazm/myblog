import { take, call, put, select } from 'redux-saga/effects'
import { getRequest, postRequest, putRequest, api } from '../fetch/fetch'
import { actionTypes as IndexActionTypes } from '../redux/reducer'
import { actionTypes as CommentActionTypes } from '../redux/reducer/commentReducer'
import {alert} from '../plugin/popup/alert'

/**
 * 获取评论（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getComments () {
  try {
    return yield call(getRequest, api.getCommentsApi)
  } catch (err) {
    alert(err)
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
      alert(res.message)
    }
  }
}