import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const numbersToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.id
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delte ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(result => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

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
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
        .catch(error => {
         // setErrorMessage(`Information of ${person.name} has already been removed from server`)
          shwoErrorMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== person.id))
          /*setTimeout(() => {
            setErrorMessage(null)
          }, 7000) */
        })
    }
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 7000)
  }

  const shwoErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() =>  {
      setErrorMessage(null)
    }, 7000)
  }

  const addPerson = (e) => {
    e.preventDefault();
    const names = persons.map(p => p.name)
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
          showSuccessMessage(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          shwoErrorMessage(error.response.data["error"])
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

  return (
    <div>
      <h1>Phonebook</h1>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App
