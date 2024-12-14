import { useState, useEffect } from 'react'
import axios from 'axios'

import personsService from './services/persons'

const Person = ({person, onDelete}) => {

  return (
    <div>
      {person.name} {person.number} <button onClick={onDelete}>delete</button>
    </div>
  )

}

const Persons = ({persons, newSearch, onDeleteButtonClicked}) => {

  return (
    <div>
      {
        persons.filter(
          person => (person.name.toLowerCase().includes(newSearch) || person.name.includes(newSearch))
        ).map(person =>
          <Person key={person.name} person={person} onDelete={() => onDeleteButtonClicked(person.id)}/>
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
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const deletePerson = (id) => {

    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      personsService
      .deletePerson(id)
      .then(response => {
        // console.log(response)
        setPersons(persons.filter(person => person.id != id))
      })
    }
  }

  const updatePersonNumber = (personToChange, newNumber) => {
    const id = personToChange.id
    const changedPersonObject = {...personToChange, number: newNumber}

    personsService
    .update(id, changedPersonObject)
    .then(response => {
      setPersons(persons.map(person => person.id === id ? response.data : person))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      alert(`The person ${personToChange.name} was deleted from server or does not exist on server`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const addName = (event) => {
    event.preventDefault()

    const personsNames = persons.map(person => person.name)
    if (personsNames.includes(newName)) {
      if (window.confirm(`${newName} already exists in the phonebook. Replace the old number with the new one ?`)) {
        const personToChange = persons.find(person => person.name === newName)
        updatePersonNumber(personToChange, newNumber)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(personObject)
        .then(newPerson => {
          // console.log(response)
          setPersons(persons.concat(newPerson))
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

      <Persons persons={persons} newSearch={newSearch} onDeleteButtonClicked={deletePerson}/>
    </div>
  )
}

export default App