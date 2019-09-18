import React from 'react';

const NewPerson = (props) => (
    <form>
        <div>
            name: <input value={props.nameValue} onChange={props.nameOnChangeHandler}/>
        </div>
        <div>
            number: <input value={props.numberValue} onChange={props.numberOnChangeHandler}/>
        </div>
        <div>
            <button type="submit" onClick={props.personOnClickHandler}>Save</button>
        </div>
    </form>
);

export default NewPerson;