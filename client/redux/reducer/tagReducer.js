// 初始状态
const initialState = []

// action 类别
export const actionTypes = {
  GET_ALL_TAGS: 'GET_ALL_TAGS', // 获取所有标签
  DELETE_TAG: 'DELETE_TAG', // 删除标签
  SAVE_TAG: 'SAVE_TAG', // 添加/修改标签
  SET_TAGS: 'RESOLVE_TAG_DATA' // 存储数据
}

// action creator
export const actions = {
  /**
   * 获取所有标签
   * @return {{type: string}}
   */
  get_all_tags: function () {
    return {
      type: actionTypes.GET_ALL_TAGS
    }
  },
  /**
   * 删除标签
   * @param name
   * @return {{type: string, content: *}}
   */
  delete_tag: function (name) {
    return {
      type: actionTypes.DELETE_TAG,
      name
    }
  },
}

export function reducer (state=initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TAGS:
      return [...action.data]
    default:
      return state
  }
}