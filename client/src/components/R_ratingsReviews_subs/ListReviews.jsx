import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const ListReviews =function ListReviews({ theme, reviews, displayCount, setRList, starFilter }) {
  let count = 0

  const filter = function(rating) {
    if (starFilter.inUse === false) {
      return true;
    } else {
      return starFilter[rating];
    }
  }

  return (
    <ReviewList className="reviewList">
      {reviews.results.map((review, index) => {
        if (count < displayCount && filter(review.rating)) {
          count++
          return <ReviewTile theme={theme} key={review.review_id} review={review} setRList={setRList} productID={reviews.product}/>
        }
      })}
    </ReviewList>
  )
}

export default ListReviews;

const ReviewList = styled.div`
  height: 75%;
  max-height: 600px;
  overflow: auto;
  padding: 5px;
  background-color: ${props => props.theme.bg};
`