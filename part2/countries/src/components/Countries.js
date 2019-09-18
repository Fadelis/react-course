import React from 'react';

import Country from './Country'

const Countries = ({countries}) => {
    if (countries.length === 0) {
        return (<p>Type in the input to search for countries</p>)
    }
    if (countries.length > 10) {
        return (<p>Too many matches, narrow your search</p>)
    }

    return (
        <table>
            <tbody>
                <tr className="header-row">
                    <td></td>
                    <td>Name</td>
                    <td>Capital</td>
                    <td>Population</td>
                    <td>Currency</td>
                    <td>Languages</td>
                </tr>
                {countries.map(country => <Country key={country.numericCode} country={country}/>)}
            </tbody>
        </table>
    )
}

export default Countries;