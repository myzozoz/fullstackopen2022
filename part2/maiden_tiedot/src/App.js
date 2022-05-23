import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, changeHandler}) =>
  <div>
    filter: <input 
      value={value}
      onChange={changeHandler}/>
  </div>

const Country = ({country, detailed}) =>
  detailed ? 
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
    : <p>{country.name.common}</p>


const CountryList = ({countries}) => 
  <div>
    {countries.length > 10
      ? <p>Too many matches, specify another filter</p> 
      : countries.map(country => <Country key={country.name.common} country={country} detailed={countries.length === 1}/>)}
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

  return (
    <div>
      <h1>Browse countries:</h1>
      <Filter value={filterText} changeHandler={(e) => setFilterText(e.target.value)}/>
      <CountryList countries={countries.filter(c => c.name.common.toLowerCase().includes(filterText))}/>
    </div>
  )
}

export default App
