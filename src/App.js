import React from 'react'
import axios from 'axios'

const Country1 = (props) => {
  return (
    <div onClick={()=> {return(<Country2 country={props.country} />)}}>
      <p>{props.country.name}</p>
    </div>
  )
}

const Country2 = (props) => {
  return (
    <div>
      <h1>{props.country.name} {props.country.nativeName}</h1>
      <p>capital: {props.country.capital}</p>
      <p>population: {props.country.population}</p>
      <img src={props.country.flag} width='20%' height='20%' alt='flag'/>
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <Country1 key={country.name} country={country} />)}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Country2 country={countries[0]} />
      </div>
    )
  } else {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })

  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const cToShow = this.state.countries.filter(country => country.name.includes(this.state.filter))
    return (
      <div>
        <form>
          find countries:<input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </form>
        <Countries countries={cToShow} />
      </div>
    )
  }
}

export default App;
