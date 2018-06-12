import React, {Component} from 'react'
import ReactAddonsPureRenderMixin from 'react-addons-pure-render-mixin'

import {Form, Input, Select, AutoComplete} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input


class EditorArticle extends Component {
  constructor (props) {
    super(props)

    this.shouldComponentUpdate = ReactAddonsPureRenderMixin.shouldComponentUpdate

    this.handleChange = this.handleChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  handleChange (e) {
    this.props.handleChange(e)
  }

  handleTagChange (value) {
    this.props.handleTagChange(value)
  }

  handleCategoryChange (value) {
    this.props.handleCategoryChange(value)
  }


  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  txtAreaCfg = {
    minRows: 8,
    maxRows: 20
  }
  render () {
    const formItemLayout = this.formItemLayout
    const txtAreaCfg = this.txtAreaCfg
    const {articleData, categories, tags} = this.props

    return (
      <Form id="articleEditForm">
        <FormItem label="文章标题" {...formItemLayout}>
          <Input value={articleData.title} name="title" onChange={this.handleChange}/>
        </FormItem>
        <FormItem label="文章前言" {...formItemLayout}>
          <Input value={articleData.foreword} name="foreword" onChange={this.handleChange}/>
        </FormItem>
        <FormItem label="文章展示的图片" {...formItemLayout}>
          <Input value={articleData.imgSrc} name="imgSrc" onChange={this.handleChange}/>
        </FormItem>
        <FormItem label="文章类别" {...formItemLayout}>
          <Select defaultValue={articleData.Category_id || 1} name="Category_id" onChange={this.handleCategoryChange}>
            {
              categories.map((category, i) => {
                return <Option value={category.id} key={i}>{category.name}</Option>
              })
            }
          </Select>
        </FormItem>
        <FormItem label="文章标签" {...formItemLayout}>
          <Select defaultValue={articleData.Tag_id || 1} name="Tag_id" onChange={this.handleTagChange}>
            {
              tags.map((tag, i) => {
                return <Option value={tag.id} key={i}>{tag.name}</Option>
              })
            }
          </Select>
        </FormItem>
        <FormItem label="正文" {...formItemLayout}>
          <TextArea autosize={txtAreaCfg} value={articleData.content} name="content" onChange={this.handleChange}/>
        </FormItem>
      </Form>
    )
  }
}

module.exports = EditorArticle