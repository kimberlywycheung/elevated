import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ListReviews =function ListReviews({ reviews, displayCount }) {

  return (
    <div className="reviewList">
      {reviews.results.map((review, index) => {
        if (index < displayCount) {
          return <ReviewTile key={review.review_id} review={review}/>
        }
      })}
    </div>
  )
}

export default ListReviews;