import React from 'react'

const ShowButton = ({ country, handleClick}) => {
    return (
        <button onClick={handleClick} id={country.name}>
            show
    </button>
    )
}

export default ShowButton