import React from 'react';

const MoreReviews =function MoreReviews({ reviews, displayCount, setDisplayCount }) {

  if (reviews - displayCount < 1) return null;

  return (
    <button onClick={() => setDisplayCount(displayCount + 2)}>
      More Reviews
    </button>
  )
}

export default MoreReviews;