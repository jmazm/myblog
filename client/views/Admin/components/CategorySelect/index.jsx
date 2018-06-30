import React, {Component} from 'react'
import CategorySelectItem from '../CategorySelectItem'

class Select extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.props.onChange(e.target.value)
  }
  render () {
    const { Category_id, data } = this.props

    return (
      <select value={ Category_id } onChange={ this.onChange } className="select">
        {
          data.length > 0 ?
            data.map((item, i) => {
              return <CategorySelectItem value={ item.name } id={ item.id } key={ i }/>
            }) :
            <CategorySelectItem id={ 0 } value={"暂无数据"}/>
        }
      </select>
    )
  }
}

module.exports = Select