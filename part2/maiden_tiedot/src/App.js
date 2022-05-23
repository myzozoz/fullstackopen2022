import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, changeHandler}) =>
  <div>
    filter: <input 
      value={value}
      onChange={changeHandler}/>
  </div>

const Country = ({country, detailed, showCallback}) =>
  detailed ? 
    <CountryDetails country={country}/>
    : <p>
        {country.name.common}
        <button onClick={() => showCallback(country.name.common)}>show</button>
      </p>

const CountryDetails = ({country}) => 
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h3>Languages:</h3>
    <ul>
      {Object.keys(country.languages).map(l => <li key={l}>{country.languages[l]}</li>)}
    </ul>
    <img src={country.flags.png} alt='flag'/>
  </div>

const CountryList = ({countries, showCallback}) => 
  <div>
    {countries.length > 10
      ? <p>Too many matches, specify another filter</p> 
      : countries.map(country =>
        <Country
          key={country.name.common}
          country={country}
          detailed={countries.length === 1}
          showCallback={showCallback}/>)}
  </div>

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  
  useState(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
  }, [])

  const showHandler = (countryName) => {
    console.log(countryName)
    setFilterText(countryName)
  }


  return (
    <div>
      <h1>Browse countries:</h1>
      <Filter value={filterText} changeHandler={(e) => setFilterText(e.target.value)}/>
      <CountryList
        countries={countries.filter(c => c.name.common.toLowerCase().includes(filterText.toLowerCase()))}
        showCallback={showHandler}/>
    </div>
  )
}

export default App
