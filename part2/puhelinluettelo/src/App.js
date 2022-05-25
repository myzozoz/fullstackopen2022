import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import ContactList from './components/ContactList'

const Filter = ({value, changeHandler}) =>
  <div>
    filter: <input
      value={value}
      onChange={changeHandler}/>
  </div>

const InputForm = ({name, number, setName, setNumber, submitHandler}) => 
<form>
  <div>
    name: <input
      value={name}
      onChange={setName}/>
  </div>
  <div>
    number: <input
      value={number}
      onChange={setNumber}/>
  </div>
  <div>
    <button type="submit" onClick={submitHandler}>add</button>
  </div>
</form>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleButtonPress = (e) => {
    e.preventDefault()
    if (persons.map(p => p.name).findIndex(n => n === newName) > -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      
      contactService.create(newPerson)
        .then(response => {
          const oldPersons = persons.filter(p => p.id !== response.id)
          setPersons([...oldPersons, response])
        })
    }
  }

  const handleDelete = (contact) => (e) => {
    e.preventDefault()
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.remove(contact.id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== contact.id))
        })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} changeHandler={(e) => setFilter(e.target.value)}/>
      <h3>Add new</h3>
      <InputForm name={newName}
        number={newNumber}
        setName={(e) => setNewName(e.target.value)}
        setNumber={(e) => setNewNumber(e.target.value)}
        submitHandler={handleButtonPress}/>
      
      <h2>Numbers</h2>
      <ContactList
        contacts={persons.filter(c => c.name.toLowerCase().includes(filter) || c.number.toLowerCase().includes(filter))}
        deleteAction={handleDelete}/>
    </div>
  )

}

export default App