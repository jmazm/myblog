const initialState = []

export const actionTypes = {
  GET_IMGS: 'GET_IMGS',
  SET_IMGS: 'SET_IMGS',
  DEL_IMG: 'DEL_IMG',
  ADD_IMG: 'ADD_IMG',
  MODYFY_IMG: 'MODYFY_IMG',
}

export const actions = {
  get_imgs: function (idFolder) {
    return {
      type: actionTypes.GET_IMGS,
      idFolder
    }
  },
  del_imgs: function (idImg) {
    return {
      type: actionTypes.DEL_IMG,
      idImg
    }
  },
  add_img: function () {
    return {
      type: actionTypes.ADD_IMG
    }
  },
  modify_img: function (idImg, ImgName) {
    return {
      type: actionTypes.MODYFY_IMG,
      idImg,
      ImgName
    }
  }
}

export function reducer (state=initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IMGS:
      return [...action.data]
    default:
      return state
  }
}