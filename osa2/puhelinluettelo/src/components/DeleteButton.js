import React from 'react'

const DeleteButton = ({ person, handleDelete }) => {
    return (
        <button id={person.id} onClick={handleDelete}>delete</button>
    )
}

export default DeleteButton