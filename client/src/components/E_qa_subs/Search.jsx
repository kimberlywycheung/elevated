import React from 'react';
import axios from 'axios';

const Search = ({setQlist, setSearchTerm}) => {

  const handleChange = (term) => {
    if(term.length < 3) {
      setSearchTerm(undefined);
    } else {
      setSearchTerm(term);
    }
  };


  return (
    <div>
      <input onChange={e => {e.preventDefault(); handleChange(e.target.value)}} id='qa-search' type='text' placeholder='search questions...'></input>
      <a style={{'fontSize': '1.5em'}}>Search</a>
    </div>

  )

};

export default Search;