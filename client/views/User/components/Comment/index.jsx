import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Validator } from '../../../../lib/form'
import { replaceHtml } from '../../../../lib/xss'

import { actions as CommentActions } from '../../../../redux/reducer/commentReducer'
import { postRequest, api } from '../../../../fetch/fetch'

import style from './style.css'

const {  get_all_comments } = CommentActions

class Comment extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      comments: [],
      commentsData: {
        name: '',
        email: '',
        website:  '',
        content: '',
        Article_id: 0
      },
      sign: ''
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    this.handlePublishClick = this.handlePublishClick.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  /**
   * 表单验证
   * @param form
   * @return {*}
   */
  validateForm (form) {
    const validator = new Validator()

    // 昵称
    validator.add(form.name, [
      {
        strategy: 'isEmpty',
        errorMsg: '昵称不能为空'
      }
    ])

    // 邮箱
    validator.add(form.email, [
      {
        strategy: 'isEmpty',
        errorMsg: '邮箱不能为空'
      },
      {
        strategy: 'isEmail',
        errorMsg: '邮箱格式错误'
      }
    ])

    // 网址
    if (form.website.value.length > 0) {
      validator.add(form.website, [
        {
          strategy: 'isWebsite',
          errorMsg: '网址格式不正确'
        }
      ])
    }

    // 评论内容
    validator.add(form.content, [
      {
        strategy: 'isEmpty',
        errorMsg: '内容不能为空'
      }
    ])

    const errorMsg = validator.start()
    return errorMsg
  }

  /**
   * 表单变化
   * @param e
   */
  handleOnChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value
    const { commentsData } = this.state

    this.setState({
      commentsData: Object.assign({}, commentsData, {
        [name]: replaceHtml(value)
      })
    })
  }

  /**
   * 发表评论
   * @return {Promise.<void>}
   */
  async handlePublishClick () {
    const form = this.form
    const errorMsg = this.validateForm(form)
    const { commentsData, sign } = this.state
    const { Article_id } = this.props

    // 表单验证
    if (errorMsg) {
      alert(errorMsg)
      return
    }

    // 设置日期和文章id
    await this.setState({
      commentsData: Object.assign({}, commentsData, {
        Article_id: Article_id,
        date: dateFormat(new Date(), 'yyyy-mm-dd HH:mm:ss')
      })
    })

    // 提交的数据
    const postData = {
      data: JSON.stringify(this.state.commentsData),
      sign: sign
    }

    // 发送请求
    const result = await postRequest(api.addCommentApi, postData)

    if (result.status === 'success') {
      alert('发布评论成功')

      // 表单重置
      form.reset()

      // state 表单数据重置
      this.setState ({
        commentsData: {
          name: '',
          email: '',
          website:  '',
          content: '',
          Article_id: 0
        }
      })

      await this.props.get_all_comments()
    }
  }

  render () {
    const { comments } = this.props
    const { sign, commentsData } = this.state
    const { name, email, content, website, Article_id } = commentsData

    return (
      <div className={ style['comment-container'] }>
        <div className={ style['header-wrapper'] }>
          <h3 className={ style['comment-ti'] }>文章评论</h3>
        </div>
        <div className={ style['comment-wrapper'] }>
          <form className={ style['comment-box'] } ref={ ele => this.form = ele }>
            <div className={ style['comment-basic-info'] }>
              <input className={ style['info-input'] } value={ name } onChange={ this.handleOnChange } name="name" type="text" placeholder="昵称"/>
              <input className={ style['info-input'] } value={ email } onChange={ this.handleOnChange } name="email" type="text" placeholder="邮箱"/>
              <input className={ style['info-input'] } value={ website } onChange={ this.handleOnChange } name="website" type="text" placeholder="网址，例：https://xxx.com"/>
              <input className={ style['info-input'] } value={ Article_id } onChange={ this.handleOnChange } name="Article_id" type="hidden"/>
              <input className={ style['info-input'] } value={ sign } onChange={ this.handleOnChange } name="sign" type="hidden"/>
            </div>
            <div className={ style['reply-area'] }>
              <img src="/avatar.png" className={ style['reply-comment-avatar'] }/>
              <div className={ style['textarea-wrapper'] }>
                <textarea className={ style['textarea']} name="content" value={ content } onChange={ this.handleOnChange }></textarea>
              </div>
              <div className={ style['reply-tool-bar'] }>
                <button className={ style['btn'] } type="button" onClick={ this.handlePublishClick }>发布</button>
              </div>
            </div>
          </form>
          <div className={ style['comment-detail'] }>
            <p>文章评论 <span>{comments.length}</span> 条</p>
          </div>
          <ul className={ style['comment-list'] }>
            {
              comments.length > 0 ?
                comments.map((comment, i) => {
                  return (
                    <li className={ style['list-item'] } key={i}>
                      <div className={ style['list-inner'] }>
                        <div className={ style['comment-avatar'] }>
                          <img src="/avatar.png"/>
                        </div>
                        <div className={ style['comment-body'] }>
                          <div className={ style['comment-header'] }>
                            <span className="comment-name">{ comment.name }</span>
                          </div>
                          <p className={ style['comment-content'] }>{ comment.content }</p>
                          <div className={ style['comment-info'] }>
                            <span className="comment-time">{dateFormat(comment.date, `yyyy 年 mm 月 dd 日 HH:mm`)}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }) :
                <li>暂无评论</li>
            }
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.get_all_comments()
  }
  componentWillUnmount () {
    this.form = null
  }
}

Comment.defaultProps = {
  comments: []
}

Comment.propTypes = {
  comments: PropTypes.array
}

function mapStateToProps (state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    get_all_comments: bindActionCreators(get_all_comments, dispatch)
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Comment)