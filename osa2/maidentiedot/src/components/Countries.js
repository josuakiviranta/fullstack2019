import React from 'react'
import ShowButton from './ShowButton'

const Countries = ({ country, handleClick }) => {
  return (
    <div>{country.name} <ShowButton country={country} handleClick={handleClick}/> </div>
  )
}

export default Countries