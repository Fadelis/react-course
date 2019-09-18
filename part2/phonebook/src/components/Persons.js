import React from 'react'

import Person from './Person'

const Persons = ({persons, deleteHandler}) => (
    <table border="1">
        <tbody>
            <tr>
                <td><b>Name</b></td>
                <td><b>Number</b></td>
                <td><b>Actions</b></td>
            </tr>
            {persons.map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler}/>)}
        </tbody>
    </table>
)

export default Persons
