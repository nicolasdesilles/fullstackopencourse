import { useState } from 'react'

const Person = ({person}) => {

  return (
    <div>
      {person.name}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const personsNames = persons.map(person => person.name)
    if (personsNames.includes(newName)) {
      alert(`${newName} is already in the Phonebook`)
    }
    else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map(person =>
            <Person key={person.name} person={person}/>
          )
        }
      </div>
    </div>
  )
}

export default App