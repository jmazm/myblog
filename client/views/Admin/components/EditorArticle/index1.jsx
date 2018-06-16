import React, {Component} from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

class EditorArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      foreword: '',
      imgSrc: '',
      Category_id: 1,
      Tag_id: 1,
      content: ''
    }

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.handleChange = this.handleChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  async handleChange (e) {
    const target = e.target
    console.log(target.name, target.value)

    await this.setState({
      [target.name]: target.value
    })

    // await this.props.handleChange(e)
  }

  handleTagChange (value) {
    this.props.handleTagChange(value)
  }

  handleCategoryChange (value) {
    this.props.handleCategoryChange(value)
  }

  render () {
    const { articleData, categories, tags } = this.props
    const { title, foreword, imgSrc, Category_id, Tag_id, content } = this.state

    return (
      <form id="articleEditForm" className="form">
        <div className="form-item">
          <label className="form-label" htmlFor="article-title">文章标题：</label>
          <input type="text" id="article-title" value={ title } name="title" onChange={ this.handleChange }/>
        </div>
        {/*<div className="form-item">*/}
          {/*<label id="article-foreword">文章前言：</label>*/}
          {/*<input id="article-foreword" value={ foreword } name="foreword" onChange={this.handleChange}/>*/}
        {/*</div>*/}
        {/*<div className="form-item" label="文章展示的图片">*/}
          {/*<label htmlFor="article-img-src">文章展示的图片：</label>*/}
          {/*<input id="article-img-src" value={imgSrc} name="imgSrc" onChange={this.handleChange}/>*/}
        {/*</div>*/}
        {/*<div className="form-item">*/}
          {/*<label className="form-label" htmlFor="article-category">文章类别：</label>*/}
          {/*<select id="article-category" value={ Category_id || 1 } name="Category_id" onChange={this.handleCategoryChange}>*/}
            {/*{*/}
              {/*categories.map((category, i) => {*/}
                {/*return <option value={category.id} key={i}>{category.name}</option>*/}
              {/*})*/}
            {/*}*/}
          {/*</select>*/}
        {/*</div>*/}
        {/*<div className="form-item">*/}
          {/*<label className="form-label" htmlFor="article-tag">文章标签：</label>*/}
          {/*<select id="article-tag" value={ Tag_id || 1 } name="Tag_id" onChange={this.handleTagChange}>*/}
            {/*{*/}
              {/*tags.map((tag, i) => {*/}
                {/*return <option value={tag.id} key={i}>{tag.name}</option>*/}
              {/*})*/}
            {/*}*/}
          {/*</select>*/}
        {/*</div>*/}
        {/*<div className="form-item">*/}
          {/*<label className="form-label" htmlFor="article-content">正文：</label>*/}
          {/*<textarea id="article-content" value={ content } name="content" onChange={this.handleChange}/>*/}
        {/*</div>*/}
      </form>
    )
  }

  async componentDidMount () {
    const { articleData } = this.props

    await this.setState({
      title: articleData.title,
      foreword: articleData.foreword,
      imgSrc: articleData.imgSrc,
      Category_id: 1,
      Tag_id: 1,
      content: articleData.content
    })
  }
}

EditorArticle.defaultProps = {
  tags: [],
  categories: [],
  articleData: {}
};

EditorArticle.propTypes = {
  articleData: PropTypes.object,
  tags: PropTypes.array,
  categories: PropTypes.array,
};

module.exports = EditorArticle