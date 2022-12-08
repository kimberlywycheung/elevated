import React from 'react';

const SortReviews =function SortReviews({ setSort, reviews }) {
  const handleChange = function(e) {
    e.preventDefault()
    setSort(e.target.value);
  }

  return (
    <div className="sort-reviews-container">
      <form>
        <label className="sort-header">{reviews.results.length} reviews, sorted by</label>
        <select className="sort-selector" onChange={handleChange}>
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
