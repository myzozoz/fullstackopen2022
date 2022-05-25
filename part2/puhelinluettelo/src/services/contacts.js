import axios from 'axios'

const getAll = () => axios
  .get('http://localhost:3001/persons')
  .then(response => response.data)

const create = (newNote) => axios
  .post('http://localhost:3001/persons', newNote)
  .then(response => response.data)

const remove = (id) => axios
  .delete(`http://localhost:3001/persons/${id}`)
  .then(res => {
    return res
  })


export default { getAll, create, remove }