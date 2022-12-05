import React from 'react';

const ReviewTile = function ReviewTile({ review }) {
  console.log(review);

  return (
    <div style={{border: "1px solid red"}}>
      <span>{review.rating} ★★★★★</span>
      <span>{review.date}</span>
      <h3>{review.reviewer_name}</h3>
      <h3>{review.summary}</h3>
      {review.recommend === true &&
        <div>
          ✔ I recommended this product
        </div>
      }
      <div>{review.body}</div>
      {review.response &&
        <div style={{backgroundColor: "gray"}}>
          <h3>Response</h3>
          {review.response}
        </div>
      }
    </div>
  )
}

export default ReviewTile;
