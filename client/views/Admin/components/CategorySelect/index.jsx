import React, {Component} from 'react'
import CategorySelectItem from '../CategorySelectItem'

class Select extends Component {
  constructor (props) {
    super(props)
  }
  onChange (e) {
    this.props.onChange(e.target.value)
  }
  render () {
    return (
      <select value={this.props.Category_id} onChange={this.onChange.bind(this)} className="select">
        {
          this.props.data.length > 0 ?
            this.props.data.map((item, i) => {
              return <CategorySelectItem value={item.name} id={item.id} key={i}/>
            }) :
            <CategorySelectItem id={0} value={"暂无数据"}/>
        }
      </select>
    )
  }
}

module.exports = Select