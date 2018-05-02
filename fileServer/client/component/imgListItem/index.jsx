import React, {Component} from 'react'
import './style.css'

class ImgListItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {idImg, ImgName, ImgUrl} = this.props
    return (
      <div className="img-list-item">
        <div className="img-list-inner">
          <img src={ImgUrl}/>
          <p className="img-name">{ImgName}</p>
        </div>
        <div className="img-operation">
          <button type="button">修改</button>
          <button type="button">删除</button>
        </div>
      </div>
    )
  }
}

module.exports = ImgListItem
