import React from 'react'

const Search = ({ searchValue, searchOnChangeHandler}) => (
    <div>
        Search countries: <input value={searchValue} onChange={searchOnChangeHandler}/>
    </div>
);

export default Search;
