import React from 'react';
import styled from 'styled-components';

const SortReviews =function SortReviews({ setSort, reviews }) {
  const handleChange = function(e) {
    e.preventDefault()
    setSort(e.target.value);
  }

  return (
    <div>
      <form>
        <SortHeader>
          {reviews.results.length} reviews, sorted by
        </SortHeader>
        <SortSelector onChange={handleChange}>
          <option
            value="relevant"
            defaultValue>
            relevance
          </option>
          <option
            value="newest">
            newest
          </option>
          <option
            value="helpful">
            helpful
          </option>
        </SortSelector>
      </form>
    </div>
  )
}

export default SortReviews;

const SortHeader = styled.label`
  font-size: 22px;
`

const SortSelector = styled.select`
  font-size: 22px;
  font-family: 'Varela Round', sans-serif;
  color: rgb(56, 56, 56);
  text-decoration: underline;
  border: none;
  background-color: transparent;
`