import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filterVal = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const editFilter = (e) => {
    e.preventDefault()
    dispatch(setFilter(e.target.value))
  }

  return (
    <div>
      filter:
      <input type="text" value={filterVal} onChange={editFilter} />
    </div>
  )
}

export default Filter
