import React from 'react'

const Search = ({ searchValue, searchOnChangeHandler}) => (
    <div>
        filter phonebook: <input value={searchValue} onChange={searchOnChangeHandler}/>
    </div>
);

export default Search;
