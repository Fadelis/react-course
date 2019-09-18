import React, { useState, useEffect } from 'react';

import Note from "./components/Note";
import Notification from "./components/Notification";

import noteService from './services/notes';


const App = () => {
    const [notes, setNotes ] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    // populate notes
    useEffect(() => {
        noteService.getAll().then(notes => setNotes(notes))
    }, [])

    const newNoteHandler = (event) => setNewNote(event.target.value)

    const errorHandler = errorMessage => {
        setErrorMessage(errorMessage)
        setTimeout(() => setErrorMessage(null), 5000)
    }

    const addNote = (event) => {
        event.preventDefault()

        const newNoteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        noteService.create(newNoteObject)
            .then(createdNote => {
                setNotes(notes.concat(createdNote))
                setNewNote('')
            })
    }

    const noteUpdateHandler = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
      
        noteService.update(changedNote)
            .then(updatedNote => setNotes(notes.map(note => note.id !== id ? note : updatedNote)))
            .catch(error => {
                errorHandler(`Note '${note.content}' was already removed from server`)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const shownNotes = notes
        .filter(note => showAll || note.important)
        .map(note => <Note key={note.id} note={note} onChangeHandler={() => noteUpdateHandler(note.id)}/>)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>{shownNotes}</ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={newNoteHandler} />
                <button type="submit">save</button>
            </form>   
        </div>
    )
}

export default App;