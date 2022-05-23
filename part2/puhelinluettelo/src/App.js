import { useState } from 'react'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleButtonPress = (e) => {
    e.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>{newName}</div>
      <form>
        <div>
          name: <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={handleButtonPress}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ContactList contacts={persons} />
    </div>
  )

}

export default App