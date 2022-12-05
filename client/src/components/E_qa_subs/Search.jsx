import React from 'react';
import axios from 'axios';

const Search = ({setQlist}) => {


  return (
    <div>
      <input id='qa-search' type='text' placeholder='search questions...'></input>
      <a style={{'fontSize': '1.5em'}}>Search</a>
    </div>

  )

};

export default Search;