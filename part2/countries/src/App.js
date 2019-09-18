import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css'

import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
    const [ countries, setCountries] = useState([]) 
    const [ searchQuery, setSearchQuery ] = useState('')

    const findAllCountries = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }
    useEffect(findAllCountries)

    const searchHandler = (event) => setSearchQuery(event.target.value)

    const shownCountries = searchQuery
        ? countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : []

    return (
        <div>
            <h1>Countries</h1>
            <Search 
                searchValue={searchQuery} 
                searchOnChangeHandler={searchHandler}/>
            <h3>Results</h3>
            <Countries countries={shownCountries}/>
        </div>
    )
}

export default App;