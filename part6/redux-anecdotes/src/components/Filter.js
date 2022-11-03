import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const editFilter = (e) => {
    e.preventDefault()
    props.setFilter(e.target.value)
  }

  return (
    <div>
      filter:
      <input type="text" value={props.filter} onChange={editFilter} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filters,
  }
}

export default connect(mapStateToProps, { setFilter })(Filter)
