import React from 'react';

const SortReviews =function SortReviews({ setSort, reviews }) {
  const handleChange = function(e) {
    e.preventDefault()
    setSort(e.target.value);
  }

  return (
    <div>
      <form>
        <label>{reviews.results.length} reviews, sorted by</label>
        <select onChange={handleChange}>
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
        </select>
      </form>
    </div>
  )
}

export default SortReviews;
