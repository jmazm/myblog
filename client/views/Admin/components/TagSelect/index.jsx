import React, {Component} from 'react'
import TagSelectItem from '../TagSelectItem'

class TagSelect extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    const { Tag_id, data } = this.props
    return (
      <select value={ Tag_id } onChange={ this.onChange } className="select">
        {
          data.length > 0 ?
            data.map((item, i) => {
              return <TagSelectItem value={ item.name } id={ item.id } key={i}/>
            }) :
            <TagSelectItem id={0} value={"暂无数据"}/>
        }
      </select>
    )
  }
}

module.exports = TagSelect