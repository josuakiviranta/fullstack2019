import React from 'react'
import DeleteButton from './DeleteButton'

const Person = ({ person, handleDelete }) => {
  return (
    <div>{person.name} {person.number} 
      <DeleteButton person={person} handleDelete={handleDelete}>delete</DeleteButton>
    </div>
  )
}

export default Person