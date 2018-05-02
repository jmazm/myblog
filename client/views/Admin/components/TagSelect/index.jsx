import React, {Component} from 'react'
import TagSelectItem from '../TagSelectItem'

class TagSelect extends Component {
  constructor (props) {
    super(props)
  }
  onChange (e) {
    this.props.onChange(e.target.value)
  }
  render () {
    return (
      <select value={this.props.Tag_id} onChange={this.onChange.bind(this)} className="select">
        {
          this.props.data.length > 0 ?
            this.props.data.map((item, i) => {
              return <TagSelectItem value={item.name} id={item.id} key={i}/>
            }) :
            <TagSelectItem id={0} value={"暂无数据"}/>
        }
      </select>
    )
  }
}

module.exports = TagSelect