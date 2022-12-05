import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ListReviews =function ListReviews({ reviews }) {
  console.log("This place ", reviews);

  return (
    <div>
      {reviews.results.map((review) => {
        return <ReviewTile key={review.review_id} review={review}/>
      })}
    </div>
  )
}

export default ListReviews;