import React, { useState, useEffect }from 'react';

import './index.css'

import Search from './components/Search'
import NewPerson from './components/NewPerson'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = (props) => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ notificationMessage, setNotificationMessage ] = useState(null)
    const [ notificationClass, setNotificationClass ] = useState(null)

    const findAllPersons = () => {
        personService.listPersons().then(retrievedPersons => setPersons(retrievedPersons))
    }
    useEffect(findAllPersons, [])

    const searchHandler = (event) => setSearchQuery(event.target.value)
    const newNameHandler = (event) => setNewName(event.target.value)
    const newNumberHandler = (event) => setNewNumber(event.target.value)

    const nofiticationHandler = (message, className) => {
        setNotificationMessage(message)
        setNotificationClass(className)
        setTimeout(() => setNotificationMessage(null), 5000)
    }

    const createPersonHandler = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)
        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (existingPerson) {
            if (window.confirm(`Update ${existingPerson.name} phone number?`)) {
                personService.updatePerson({...newPerson, id: existingPerson.id})
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                        setNewName('')
                        setNewNumber('')
                        nofiticationHandler(`Updated ${updatedPerson.name} in the phonebook`, 'ok')
                    })
                    .catch(err => nofiticationHandler(`${existingPerson.name} does not exist in the phonebook anymore`, 'error'))
            }
            return;
        }

        personService.createPerson(newPerson)
            .then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNewName('')
                setNewNumber('')
                nofiticationHandler(`Added ${createdPerson.name} to the phonebook`, 'ok')
            })
            .catch(err => nofiticationHandler(`Failed to create ${existingPerson.name} in the phonebook`, 'error'))
    }
    const deletePersonHandler = (id) => {
        const person = persons.find(person => person.id === id)
        if (!person) {
            nofiticationHandler(`${person.name} does not exist in the phonebook`, 'error')
            return;
        }

        if (window.confirm(`Delete ${person.name}?`)) {
            personService.deletePerson(id)
                .then(() =>  {
                    setPersons(persons.filter(person => person.id !== id))
                    nofiticationHandler(`Deleted ${person.name} from the phonebook`, 'ok')
                })
                .catch(err => nofiticationHandler(`${person.name} does not exist in the phonebook anymore`, 'error'))
        }
    }

    const personsToShow = persons
        .filter(person => person.name.toLowerCase().includes(searchQuery))

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage} className={notificationClass} />
            <Search 
                searchValue={searchQuery} 
                searchOnChangeHandler={searchHandler}/>
            <h2>Add new</h2>
            <NewPerson 
                nameValue={newName} 
                nameOnChangeHandler={newNameHandler} 
                numberValue={newNumber} 
                numberOnChangeHandler={newNumberHandler} 
                personOnClickHandler={createPersonHandler} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deleteHandler={deletePersonHandler}/>
        </div>
    )
}

export default App;