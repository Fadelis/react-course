import React from 'react';

const Country = ({country}) => (
    <tr className="country-row">
        <td><img src={country.flag} width="32"/></td>
        <td>{country.name}</td>
        <td>{country.capital}</td>
        <td>{country.population}</td>
        <td>[{country.currencies[0].symbol}] {country.currencies[0].name}</td>
        <td>
            <ul>
                {country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
            </ul>
        </td>
    </tr>
);

export default Country;