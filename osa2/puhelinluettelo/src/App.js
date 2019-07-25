import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState([''])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNames(initialPersons.map(p => p.name))
      })
  }, [])

  const numbersToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  const handleDelete = (e) => {
    e.preventDefault();
    const id = Number(e.target.id)
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delte ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNames(names.filter(n => n !== person.name))
        })
    }
  }


const rows = () => numbersToShow.map(person =>
  <Person key={person.id} person={person} handleDelete={handleDelete} />
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
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }
}


return (
  <div>
    <h2>Phonebook</h2>
    <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
    <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
    <h2>Numbers</h2>
    {rows()}
  </div>
)

}

export default App
