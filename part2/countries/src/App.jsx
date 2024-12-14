import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newSearch, onChange}) => {
  return (
    <div>
      Find countries: <input value={newSearch} onChange={onChange}/>
    </div>
  )

}

const Results = ({newSearch, searchResults}) => {

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
            <div key={country.cca3}>{country.name.common}</div>
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
        <Country country={country}/>
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

const Country = ({country}) => {

  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.entries(country.languages)
  const flagImageURL = country.flags.svg

  const flagStyle = {
    width: '300px'
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
      
    </div>
  )

}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [fullCountriesData, setfullCountriesData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setfullCountriesData(response.data)
      })
    }, [])

  const handleNewSearchChange = (event) => {
    
    setNewSearch(event.target.value)
    setSearchResults(fullCountriesData.filter(country => country.name.common.includes(event.target.value) || country.name.common.toLowerCase().includes(event.target.value)))

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
        <Results newSearch={newSearch} searchResults={searchResults}/>
      </div>
    )
  }
  
}

export default App
