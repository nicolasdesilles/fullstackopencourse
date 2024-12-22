import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_OWM_KEY

const Filter = ({newSearch, onChange}) => {
  return (
    <div>
      Find countries: <input value={newSearch} onChange={onChange}/>
    </div>
  )

}

const Results = ({newSearch, searchResults, onShowButtonClicked, weatherData}) => {

  if (searchResults === null || newSearch === '') {
    return (
      <div>
        Please enter a search query
      </div>
    )
  }
  else if (searchResults.length > 10) {
    return (
      <div>
        Too many matches, please specify another filter
      </div>
    )
  }
  else if (searchResults.length > 1 && searchResults.length <= 10) {
    //console.log(searchResults)
    return (
      <div>
        {
          searchResults.map(country =>
            <div key={country.cca3}>{country.name.common} <button onClick={() => onShowButtonClicked(country)}>show</button> </div>
          )
        }
      </div>
    )
  }
  else if (searchResults.length == 1) {
    const country = searchResults[0]
    //console.log(country)
    return (
      <div>
        <Country country={country} weatherData={weatherData}/>
      </div>
    )
  }
  else {
    return (
      <div>
        No matches.
      </div>
    )
  }
}

const WeatherReport = ({weatherData}) => {

  if (weatherData === null) {
    return (
      <div>
        Please wait while the weather data is being fetched from the API...
      </div>
    )
  }
  else {
    const temperature = weatherData.main.temp
    const wind = weatherData.wind.speed
    const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    return (

      <div>
        <div>Temperature {temperature} degrees Celcius</div>

        <div>
          <img src={iconURL}></img>
        </div>

        <div>Wind {wind} m/s</div>
      </div>

    )
  }

  

}


const Country = ({country, weatherData}) => {

  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.entries(country.languages)
  const flagImageURL = country.flags.svg

  const flagStyle = {
    width: '300px',
    border: '1px solid black'
  }

  return (
    <div>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>

      <h2>Languages</h2>
      <ul>
        {
          languages.map(lang =>
            <li key={lang[0]}>{lang[1]}</li>
          )
        }
      </ul>

      <div>
        <img src={flagImageURL} style={flagStyle}></img>
      </div>

      <h2>Weather in {capital}</h2>

      <WeatherReport weatherData={weatherData}/>

      
    </div>
  )

}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [fullCountriesData, setfullCountriesData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setfullCountriesData(response.data)
      })
    }, [])

  useEffect(() => {
    if (searchResults === null) {
      setWeatherData(null)
    } 
    else if (searchResults.length == 1) {

      var latitude = 0
      var longitude = 0

      axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchResults[0].capital[0]}&limit=5&appid=${api_key}`)
      .then(response => {
        console.log(`${searchResults[0].capital[0]} latitude and longitude`)
        console.log(response.data[0])

        latitude = response.data[0].lat
        longitude = response.data[0].lon

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
          .then(response => {
            console.log('Weather data')
            console.log(response.data)
            setWeatherData(response.data)
          })
          .catch(error => {
            console.log('Error fetching weather data from OpenWeatherMap API')
          })
      })
      .catch(error => {
        console.log('Error fetching Capital latitude and longitude from OpenWeatherMap API')
      })
    }
    else {
      setWeatherData(null)
    }
    
    }, [searchResults])

  const handleNewSearchChange = (event) => {
    
    setNewSearch(event.target.value)
    setSearchResults(fullCountriesData.filter(country => country.name.common.includes(event.target.value) || country.name.common.toLowerCase().includes(event.target.value)))

  }

  const handleShowButtonClicked = (country) => {

    setSearchResults([country])

  }

  if (fullCountriesData === null) {
    return (
      <div>
        Please wait while the App is fetching the countries data from the API...
      </div>
    )
  } 
  else {
    return (
      <div>
        <Filter newSearch={newSearch} onChange={handleNewSearchChange}/>
        <Results newSearch={newSearch} searchResults={searchResults} onShowButtonClicked={handleShowButtonClicked} weatherData={weatherData}/>
      </div>
    )
  }
  
}

export default App
