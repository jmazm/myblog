import React, {Component} from 'react'
import ImgListItem from '../imgListItem'
import './style.css'

class ImgList extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {data} = this.props
    return (
      <div className="img-list-wrapper">
        {
          data.map((item, i) => {
            return <ImgListItem idImg={item.idImg} ImgName={item.ImgName} ImgUrl={item.ImgUrl} key={i}/>
          })
        }
      </div>
    )
  }
}

module.exports = ImgList
