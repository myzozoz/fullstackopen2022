import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios
  .get(baseUrl)
  .then(response => response.data)

const create = (newPerson) => axios
  .post(baseUrl, newPerson)
  .then(response => response.data)

const update = (person) => axios
  .put(`${baseUrl}/${person.id}`, person)
  .then(response => response.data)

const remove = (id) => axios
  .delete(`${baseUrl}/${id}`)
  .then(res => {
    return res
  })


export default { getAll, create, update, remove }