import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'
import FilterForm from './components/FilterForm';

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [showCountries, setShowCountries] = useState(false)
  const [showCountry, setShowCountry] = useState(false)

  const countriesToShow = showCountries
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    : []

  const rows = () => {
    if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <Country
            key={country.name}
            country={country}
          />
        )
      )
    }
    else {
      return (
        countriesToShow.map(country =>
          <Countries
            key={country.name}
            country={country}
            handleClick={handleClick}
          />
        )
      )
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    const country = countriesToShow.filter(country => e.target.id === country.name)
    setCountry(country)
    setShowCountry(true)
  }

  const dataFromRestcountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(dataFromRestcountries, [])

  const handleFilterChange = (event) => {
    const typedFilter = event.target.value
    setNewFilter(typedFilter)
    setShowCountry(false)
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(typedFilter.toLowerCase()))
    if (countriesToShow.length < 10) {
      setShowCountries(true)
    } else {
      setShowCountries(false)
    }
  }

  return (
    <div>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {console.log('Show country', showCountry)}
      {countriesToShow.forEach(c => console.log(c))}
      {showCountry ? country.map(country => <Country key={country.name} country={country}/>) : rows()}
    </div>
  )
}

export default App;