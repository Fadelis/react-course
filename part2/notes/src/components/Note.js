import React from 'react';

const Note = ({note, onChangeHandler}) => (
    <li className='note'>
        {note.content}
        <input type="checkbox" checked={note.important} onChange={onChangeHandler}/>Important
    </li>
);

export default Note;