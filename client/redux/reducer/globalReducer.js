// 初始状态
const initialState = {
  isFetching: true, // 正在请求中
  msg: {
    type: 1, // 0 失败，1 成功
    info: ''
  },
  userInfo: {}
}

export const actionTypes = {
  FETCH_START: "FETCH_START", // 开始进行异步请求
  FETCH_END: "FETCH_END", // 异步请求结束
  USER_LOGIN: "USER_LOGIN", // 用户登录
  USER_REGISTER: "USER_REGISTER", // 用户注册
  RESPONSE_USER_INFO: "RESPONSE_USER_INFO", // 收到登录信息
  SET_MESSAGE: "SET_MESSAGE", // 设置全局提醒
  USER_AUTH: "USER_AUTH" // 用户验证
}

export const actions = {
  /**
   * 登录
   * @param username
   * @param password
   * @return {{type: string, username: *, password: *}}
   */
  get_login: function (username, password) {
    return {
      type: actionTypes.USER_LOGIN,
      username,
      password
    }
  },
  /**
   * 清除信息
   * @return {{type: string, msgType: number, msgInfo: string}}
   */
  clear_msg: function () {
    return {
      type: actionTypes.SET_MESSAGE,
      msgType: 1,
      msgInfo: ''
    }
  },

  get_msg: function () {
    return {
      type: actionTypes.SET_MESSAGE
    }
  },

  user_auth:function () {
    return{
      type:actionTypes.USER_AUTH
    }
  }
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_END:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        isFetching: false,
        msg: {
          type: action.msgType,
          info: action.msgInfo
        }
      }
    case actionTypes.RESPONSE_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}
