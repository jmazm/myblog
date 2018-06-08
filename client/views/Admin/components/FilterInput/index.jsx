import React, {Component} from 'react'
import FilterListItem from '../../components/FilterListItem'
import './style.css'

let arr = [
  'HTML', 'Web', 'Web前端实践', 'Web前端', 'Webpack', 'React', 'javascript', 'css', 'angular', 'jquery'
]

class FilterInput extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="filter-input-bar">
        <input className="input" type="text" onChange={this.props.onChange.bind(this)}/>
        <ul className="filter-list">
          {
            arr.map((item, i) => {
              return <FilterListItem key={i} name={item}/>
            })
          }
        </ul>
      </div>
    )
  }
}

module.exports = FilterInput