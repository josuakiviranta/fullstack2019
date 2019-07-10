import React from 'react'

const Country = ({ country }) => {
    const languages = country.languages.map((language) =>
    <li key={language.iso639_1}>{language.name}</li>
    )
    
  return (
    <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
            {languages}
        </ul>
        <img src={country.flag} alt="flag" />
    </div>
  )
}

export default Country