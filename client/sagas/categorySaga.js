import { take, call, put } from 'redux-saga/effects'
import { getRequest, postRequest, delRequest, api } from '../fetch/fetch'
import { actionTypes as GlobalActionTypes } from '../redux/reducer/globalReducer'
import { actionTypes as CategoryActionTypes } from '../redux/reducer/categoryReducer'

import Cookie from 'js-cookie'

/**
 * 添加/修改标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveCategory (data) {
  // 开始请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const csrfToken = Cookie.get('CSRF_TOKEN')

    return yield call(postRequest, api.saveCategoryApi, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-csrf-token': csrfToken
      }
    })
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

export function* saveCategoryFlow () {
  while (true) {
    let req = yield take(CategoryActionTypes.ADD_CATEGORY)

    let res = yield call(saveCategory, {
      name: req.category
    })

    if (res.status == 'success') {
      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 1,
        msgInfo: '添加成功'
      })
    } else {
      alert(res.message)
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
function* getCategories () {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    return yield call(getRequest, api.getAllCategoryApi)
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


export function* getCategoriesFlow () {
  while (true) {
    yield take(CategoryActionTypes.GET_ALL_CATEGORIES)

    // 拿回来的响应
    let res = yield call(getCategories)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: CategoryActionTypes.SET_CATEGORIES,
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
function* delCategory (id) {
  // 开始进行异步请求
  yield put({
    type: GlobalActionTypes.FETCH_START
  })

  try {
    return yield call(delRequest, api.deleteCategoryApi(id))
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

export function* delCategoryFlow () {
  while (true) {
    let req = yield take(CategoryActionTypes.DELETE_CATEGORY)

    // 拿回来的响应
    let res = yield call(delCategory, req.id)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: CategoryActionTypes.SET_CATEGORIES,
        data: res.data
      })

      yield put({
        type: GlobalActionTypes.SET_MESSAGE,
        msgType: 1,
        msgInfo: '删除成功'
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