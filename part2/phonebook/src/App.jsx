import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {

  return (
    <div>
      {person.name} {person.number}
    </div>
  )

}

const Persons = ({persons, newSearch}) => {

  return (
    <div>
      {
        persons.filter(
          person => (person.name.toLowerCase().includes(newSearch) || person.name.includes(newSearch))
        ).map(person =>
          <Person key={person.name} person={person}/>
        )
      }
    </div>
  )

}

const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const Filter = ({newSearch, onChange}) => {

  return (
    <div>
      Filter names: <input value={newSearch} onChange={onChange}/>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearchChange = (event) => {
    // console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const personsNames = persons.map(person => person.name)
    if (personsNames.includes(newName)) {
      alert(`${newName} is already in the Phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          // console.log(response)

          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter newSearch={newSearch} onChange={handleNewSearchChange}/>

      <h2>Add a new</h2>

      <PersonForm 
        onSubmit={addName} 
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />
      
      <h2>Numbers</h2>

      <Persons persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App