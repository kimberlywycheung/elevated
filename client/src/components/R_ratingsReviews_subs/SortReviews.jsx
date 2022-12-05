import React from 'react';

const SortReviews =function SortReviews({ reviews }) {
  return (
    <div>
      <form>
        <label>{reviews.count} reviews, sorted by</label>
        <select>
          <option>relevance</option>
          <option>newest</option>
          <option>helpful</option>
        </select>
      </form>
    </div>
  )
}

export default SortReviews;
