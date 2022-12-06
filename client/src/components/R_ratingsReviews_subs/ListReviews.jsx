import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ListReviews =function ListReviews({ reviews, displayCount, setRList }) {

  return (
    <div className="reviewList">
      {reviews.results.map((review, index) => {
        if (index < displayCount) {
          return <ReviewTile key={review.review_id} review={review} setRList={setRList}/>
        }
      })}
    </div>
  )
}

export default ListReviews;