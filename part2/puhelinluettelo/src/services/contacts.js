import axios from 'axios'

const getAll = () => axios
  .get('http://localhost:3001/persons')
  .then(response => response.data)

const create = (newPerson) => axios
  .post('http://localhost:3001/persons', newPerson)
  .then(response => response.data)

const update = (person) => axios
  .put(`http://localhost:3001/persons/${person.id}`, person)
  .then(response => response.data)

const remove = (id) => axios
  .delete(`http://localhost:3001/persons/${id}`)
  .then(res => {
    return res
  })


export default { getAll, create, update, remove }