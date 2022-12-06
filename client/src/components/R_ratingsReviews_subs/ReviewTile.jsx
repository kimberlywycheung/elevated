import React from 'react';

const ReviewTile = function ReviewTile({ review }) {

  return (
    <div style={{border: "1px solid red"}}>
      <span>{review.rating} ★★★★★</span>
      <span>{review.date}</span>
      <h3>{review.reviewer_name}</h3>
      {review.recommend === true &&
        <div>
          ✔ I recommended this product
        </div>
      }
      <h3>{review.summary}</h3>
      <div>
        <div>{review.body}</div>
        <span>Photos: <a>{review.photos.length}</a></span>
      </div>
      {review.response &&
        <div style={{backgroundColor: "gray"}}>
          <h3>Response</h3>
          {review.response}
        </div>
      }
      <span>Helpful? <a>Yes</a> ({review.helpfulness}) | <a>No</a></span>
    </div>
  )
}

export default ReviewTile;
