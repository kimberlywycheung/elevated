import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const ListReviews =function ListReviews({ reviews, displayCount, setRList, starFilter }) {
  let count = 0

  const filter = function(rating) {
    if (starFilter.inUse === false) {
      return true;
    } else {
      return starFilter[rating];
    }
  }

  return (
    <div className="reviewList">
      {reviews.results.map((review, index) => {
        if (count < displayCount && filter(review.rating)) {
          count++
          return <ReviewTile key={review.review_id} review={review} setRList={setRList} productID={reviews.product}/>
        }
      })}
    </div>
  )
}

export default ListReviews;