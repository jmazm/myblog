// 初始状态
const initialState = {
  tag: [], // 文章标签
  category: [], // 文章类别
  articleList: [], // 文章列表
  articleDetail: {}, // 文章细节
  currentPage: 1, // 当前页
  total: 0, // 文章总数
  newArticleData: {
    title: '', // 文章标题
    content: '', // 文章内容
    Tag_id: 1, // 文章标签
    Category_id: 1, // 文章类别
    id: '', // 文章ID
    imgSrc: '', // 文章列表要展示的图片地址
    foreword: '' // 文章前言
  }
}

// ation: 表示改变状态的意图
export const actionTypes = {
  GET_ALL_ARTICLES: 'GET_ALL_ARTICLES',
  RESPONSE_ALL_ARTICLES: 'RESPONSE_ALL_ARTICLES',
  GET_ARTICLE_DETAIL: 'GET_ARTICLE_DETAIL',
  RESPONSE_ARTICLE_DETAIL: 'RESPONSE_ARTICLE_DETAIL',
  UPDATING_TITLE: 'UPDATING_TITLE', // 更新标题
  UPDATING_CONTENT: 'UPDATING_CONTENT', // 更新内容
  UPDATING_TAG: 'UPDATING_TAG', // 更新标签
  UPDATING_Category: 'UPDATING_Category', // 更新类别
  UPDATING_SHOWED_IMG_URL: 'UPDATING_SHOWED_IMG_URL', // 更新文章列表要展示的图片地址
  UPDATING_FOREWORD: 'UPDATING_FOREWORD', // 更新文章前言
  SAVE_ARTICLE: 'SAVE_ARTICLE', // 保存文章
  SET_ARTICLE_ID: 'SET_ARTICLE_ID' // 设置文章ID
}

// action creator：创建action的函数
/**
 * @example {
 *    pageNum: paramsObj.pageNum,
      pageSize: paramsObj.pageSize,
      tag: paramsObj.tag,
      category: paramsObj.category
 * }
 * @type {{get_all_articles: actions.get_all_articles, get_article_detail: actions.get_article_detail}}
 */
export const actions = {
  get_all_articles: function (paramsObj) {
    return {
      type: actionTypes.GET_ALL_ARTICLES,
      paramsObj
    }
  },
  /**
   * 获取文章细节的 action creator
   * @param id
   * @return {{type: string, id: *}}
   */
  get_article_detail: function (id) {
    return {
      type: actionTypes.GET_ARTICLE_DETAIL,
      id
    }
  },
  /**
   * 更新标题
   * @param title
   * @return {{type: string}}
   */
  update_title: function (title) {
    return {
      type: actionTypes.UPDATING_TITLE,
      title
    }
  },
  /**
   * 更新图片地址
   * @param imgSrc
   * @return {{type: string}}
   */
  update_showed_img_url: function (imgSrc) {
    return {
      type: actionTypes.UPDATING_SHOWED_IMG_URL,
      imgSrc
    }
  },
  /**
   * 更新前言
   * @param foreword
   * @return {{type: string}}
   */
  update_foreword: function (foreword) {
    return {
      type: actionTypes.UPDATING_FOREWORD,
      foreword
    }
  },
  /**
   * 更新内容
   * @param content
   * @return {{type: string, content: *}}
   */
  update_content: function (content) {
    return {
      type: actionTypes.UPDATING_CONTENT,
      content
    }
  },
  /**
   * 更新标签
   * @param Tag_id
   * @return {{type: *, tag: *}}
   */
  update_tag:function (Tag_id) {
    return{
      type:actionTypes.UPDATING_TAG,
      Tag_id
    }
  },
  /**
   * 更新类别
   * @param Category_id
   * @return {{type: string, category: *}}
   */
  update_category:function (Category_id) {
    return{
      type:actionTypes.UPDATING_Category,
      Category_id
    }
  },
  /**
   * 保存文章
   * @param data
   * @param csrfToken
   * @example {
   * articleData: {}
   * }
   * @return {{type: string, data: *}}
   */
  save_article:function (postData) {
    return {
      type:actionTypes.SAVE_ARTICLE,
      data: postData
    }
  }
}

/**
 * reducer
 * @param state
 * @param action
 * @return {*}
 */
export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESPONSE_ALL_ARTICLES:
      return {
        articleList: action.data,
        total: action.total
      }
    case actionTypes.RESPONSE_ARTICLE_DETAIL:
      return {
        articleDetail: action.data
      }
    case actionTypes.UPDATING_TITLE:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          title: action.title
        })
      }
    case actionTypes.UPDATING_FOREWORD:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          foreword: action.foreword
        })
      }
    case actionTypes.UPDATING_SHOWED_IMG_URL:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          imgSrc: action.imgSrc
        })
      }
    case actionTypes.UPDATING_CONTENT:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          content: action.content
        })
      }
    case actionTypes.UPDATING_TAG:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          Tag_id: action.Tag_id
        })
      }
    case actionTypes.UPDATING_Category:
      return {
        newArticleData: Object.assign({},state.newArticleData, {
          Category_id: action.Category_id
        })
      }
    case actionTypes.SET_ARTICLE_ID:
      return {
        newArticleData: Object.assign({}, state.newArticleData, {
          id: action.id
        })
      }
    default:
      return state
  }
}
