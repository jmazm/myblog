import {take, call, put, select} from 'redux-saga/effects'
import {getRequest, postRequest, delRequest, api} from '../fetch/fetch'
import {actionTypes as TagActionTypes} from '../redux/reducer/tagReducer'

/**
 * 添加/修改标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* saveTag (data) {
  // 开始进行异步请求
  try {
    return yield call(postRequest, api.saveTagApi, data)

  } catch (err) {
    console.log(err.message)
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
      alert(res.msg)
    }

    const tagInput = document.getElementById('tag-input')
    tagInput.value = ''
  }
}



/**
 * 获取标签（发送请求的准备：即打开连接，发送数据）
 * @param data
 * @return {*}
 */
function* getTags () {
  // 开始进行异步请求
  try {
    return yield call(getRequest, api.getAllTagApi)
  } catch (err) {
    console.log(err.message)
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
      alert(status.msg)
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
  try {
    return yield call(delRequest, api.deleteTagApi(id))
  } catch (err) {
    console.log(err.message)
  }
}

export function* delTagFlow () {
  while (true) {
    let req = yield take(TagActionTypes.DELETE_TAG)

    // 拿回来的响应
    let res = yield call(delTag, req.id)

    // 判断返回的响应
    if (res.status === 'success') {
      // 存储数据
      yield put({
        type: TagActionTypes.SET_TAGS,
        data: res.data
      })
      alert('删除成功')
    } else {
      alert(status.msg)
    }
  }
}