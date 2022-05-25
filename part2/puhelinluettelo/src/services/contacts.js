import axios from 'axios'

const getAll = () => axios
  .get('http://localhost:3001/persons')
  .then(response => response.data)

const create = (newNote) => {
  console.log('newNote', newNote)
  return axios
    .post('http://localhost:3001/persons', newNote)
    .then(response => response.data)
}


export default { getAll, create }