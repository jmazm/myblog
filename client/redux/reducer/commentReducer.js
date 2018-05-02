// 初始状态
const initialState = []

// action 类别
export const actionTypes = {
  GET_ALL_COMMENTS: 'GET_ALL_COMMENTS', // 获取所有评论
  SET_COMMENTS: 'SET_COMMENTS' // 存储评论
}

// action creator
export const actions = {
  /**
   * 获取所有评论
   * @return {{type: string}}
   */
  get_all_comments: function () {
    return {
      type: actionTypes.GET_ALL_COMMENTS
    }
  }
}

export function reducer (state=initialState, action) {
  switch (action.type) {
    case actionTypes.SET_COMMENTS:
      return [...action.data]
    default:
      return state
  }
}