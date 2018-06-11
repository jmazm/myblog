import {take, call, put} from 'redux-saga/effects'
import {getRequest, postRequest, putRequest, api} from '../fetch/fetch'
import {actionTypes as IndexActionTypes} from '../redux/reducer'
import {actionTypes as CategoryActionTypes} from '../redux/reducer/categoryReducer'

/**
 * 添加/修改标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveCategory (data) {
  try {
    return yield call(postRequest, api.saveCategoryApi, data)
  } catch (err) {
    return err.message
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
    type: IndexActionTypes.FETCH_START
  })
  try {
    return yield call(getRequest, api.getAllCategoryApi)
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

export function* saveCategoryFlow () {
  while (true) {
    let request = yield take(CategoryActionTypes.ADD_CATEGORY)

    let res = yield call(saveCategory, {
      name: request.category
    })

    if (res.status == 'success') {
      alert('添加成功')
    } else {
      alert(res.msg)
    }

    const categoryInput = document.getElementById('category-input')
    categoryInput.value = ''
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
        type: IndexActionTypes.SET_MESSAGE,
        msgContent: res.message,
        msgType: 0
      });
    }
  }
}