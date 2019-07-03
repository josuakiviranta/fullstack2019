import React, { useState } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState(['Arto Hellas'])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

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
