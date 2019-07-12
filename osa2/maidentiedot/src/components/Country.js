import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const languages = country.languages.map((language) =>
    <li key={language.iso639_1}>{language.name}</li>
  )
  const [weather, setWeather] = useState([])
  const [isWeatherEmpty, setIsWeatherEmpty] = useState(true)

  const weatherData = () => {
    const capitalizedCapital = country.capital.charAt(0).toUpperCase() + country.capital.slice(1)
    axios
      .get('http://api.apixu.com/v1/current.json?key=728e05a2985f4889a8f75630191207&q=' + capitalizedCapital)
      .then(response => {
        setWeather(response.data)
        setIsWeatherEmpty(false)
      })
  }

  useEffect(weatherData, [])

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
      <h3>Weather in {country.capital}</h3>
      <h4>temperature: {isWeatherEmpty ? '' : weather.current.temp_c} Celsius</h4>
      <img src={isWeatherEmpty ? '' : weather.current.condition.icon} alt="weather" />
      <h4>wind: {isWeatherEmpty ? '' : weather.current.wind_kph} kph direction {isWeatherEmpty ? '' : weather.current.wind_dir} </h4>
    </div>
  )
}

export default Country