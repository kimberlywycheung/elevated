import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSearch = styled.input`
  padding: 20px;
  margin: 20px;
  height: 20px;
  width: 80%;
  font-size: 2em;
`;

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
      <StyledSearch onChange={e => {e.preventDefault(); handleChange(e.target.value)}} type='text' placeholder='search questions...'></StyledSearch>
      <a style={{'fontSize': '1.5em'}}>Search</a>
    </div>

  )

};

export default Search;