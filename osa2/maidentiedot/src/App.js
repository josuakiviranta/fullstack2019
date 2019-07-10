import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'
import FilterForm from './components/FilterForm';

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)

  const countriesToShow = showCountries
    ? countries.filter(country => country.name.includes(newFilter))
    : []

  const rows = () => {
    if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <Country
            key={country.alpha2Code}
            country={country}
          />
        )
      )
    }
    else {
      return (
        countriesToShow.map(country =>
          <Countries
            key={country.alpha2Code}
            country={country}
          />
        )
      )
    }
  }

  const dataFromRestcountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  countriesToShow.forEach(x => console.log(x.name))

  useEffect(dataFromRestcountries, [])


  const handleFilterChange = (event) => {
    const typedFilter = event.target.value
    setNewFilter(typedFilter)
    const countriesToShow = countries.filter(country => country.name.includes(typedFilter))
    if (countriesToShow.length < 10) {
      setShowCountries(true)
    } else {
      setShowCountries(false)
    }
  }


  return (
    <div>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {rows()}
    </div>
  )
}

export default App;