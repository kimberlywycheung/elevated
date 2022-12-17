import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';


const StyledSearch = styled.input`
  background-color: ${props => props.theme.searchBG};
  border-style:solid;
  padding: 20px;
  margin: 20px;
  height: 20px;
  width: 80%;
  font-size: 2em;
  color: ${props => props.theme.fontColor};
`;

const Search = ({theme, setQlist, setSearchTerm}) => {

  const handleChange = (term) => {
    if(term.length < 3) {
      setSearchTerm(undefined);
    } else {
      setSearchTerm(term);
    }
  };

  $("#qaSearch").focus( function() {
    $("#qaSearch").css({"outline":"none"});
});


  return (
    <div>
      <StyledSearch id='qaSearch' theme={theme} onChange={e => {e.preventDefault(); handleChange(e.target.value)}} type='text' placeholder='search questions...'></StyledSearch>
      <a style={{'fontSize': '1.5em'}}>Search</a>
    </div>

  )

};

export default Search;