import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ListReviews =function ListReviews({ reviews, displayCount, setRList }) {
  let count = 0
  // const obj = {5: true}
  return (
    <div className="reviewList">
      {reviews.results.map((review, index) => {
        // if (count < displayCount && obj[review.rating]) {
        if (count < displayCount) {
          console.log(review.rating);
          count++
          return <ReviewTile key={review.review_id} review={review} setRList={setRList}/>
        }
      })}
    </div>
  )
}

export default ListReviews;