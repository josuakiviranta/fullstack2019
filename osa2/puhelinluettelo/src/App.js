import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState([''])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)

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
    <Person
      key={person.id}
      person={person}
      handleDelete={handleDelete}
    />
  )

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
    if (e.target.value !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const confirmNumberChange = (person) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson)))
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (names.includes(newName)) {
      const person = persons.find(p => p.name === newName)
      confirmNumberChange(person)
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
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={successMessage} />

      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App
