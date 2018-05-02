// 初始状态
const initialState = []

// action 类别
export const actionTypes = {
  GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES', // 获取所有类别
  SET_CATEGORIES: 'RESPONSE_DATA_CATEGORIES', // 存储类别
  DELETE_CATEGORY: 'DELETE_CATEGORY', // 删除类别
  ADD_CATEGORY: 'ADD_CATEGORY' // 添加类别
}

// action creator
export const actions = {
  /**
   * 获取所有类别
   * @return {{type: string}}
   */
  get_all_categories: function () {
    return {
      type: actionTypes.GET_ALL_CATEGORIES
    }
  },
  /**
   * 删除类别
   * @param category
   * @return {{type: string, content: *}}
   */
  delete_category: function (category) {
    return {
      type: actionTypes.DELETE_CATEGORY,
      category
    }
  },
  /**
   * 添加类别
   * @param name
   * @return {{type: *, tag: *}}
   */
  add_category:function (category) {
    return{
      type:actionTypes.ADD_CATEGORY,
      category
    }
  }
}

export function reducer (state=initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return [...action.data]
    default:
      return state
  }
}