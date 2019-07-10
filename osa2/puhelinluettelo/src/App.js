import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState([''])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const numbersToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  const rows = () => numbersToShow.map(person =>
    <Person
      key={person.id}
      person={person}
    />
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length,
      }
      setPersons(persons.concat(personObject))
      setNames(names.concat(personObject.name))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App
