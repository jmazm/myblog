import { take, call, put } from 'redux-saga/effects'
import { getRequest, postRequest, delRequest, api } from '../fetch/fetch'
import { actionTypes as TagActionTypes } from '../redux/reducer/tagReducer'
import { actionTypes as GlobalActionTypes } from '../redux/reducer/globalReducer'

import Cookie from 'js-cookie'

/**
 * 添加/修改标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveTag (data) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(postRequest, api.saveTagApi, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
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

export function* saveTagFlow () {
  while (true) {
    let request = yield take(TagActionTypes.SAVE_TAG)

    let res = yield call(saveTag, {
      name: request.tag
    })

    if (res.status == 'success') {
      alert('添加成功')
    } else {
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 0,
        msgInfo: res.message
      })
    }
  }
}

/**
 * 获取标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getTags () {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN') || ''
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(getRequest, api.getAllTagApi,  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
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

export function* getTagsFlow () {
  while (true) {
    yield take(TagActionTypes.GET_ALL_TAGS)

    // 拿回来的响应
    let res = yield call(getTags)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: TagActionTypes.SET_TAGS,
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

/**
 * 删除标签
 * @param data
 * @return {*}
 */
function* delTag (id) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(delRequest, api.deleteTagApi(id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
  } catch (err) {
    // 报错处理
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

export function* delTagFlow () {
  while (true) {
    let req = yield take(TagActionTypes.DELETE_TAG)

    // 拿回来的响应
    let res = yield call(delTag, req.id)

    // 判断返回的响应
    if (res.status === 'success') {
      alert('删除成功')

      // 存储数据
      yield put({
        type: TagActionTypes.SET_TAGS,
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