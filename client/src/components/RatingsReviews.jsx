import React from 'react';
import axios from 'axios';
import Breakdown from './R_ratingsReviews_subs/Breakdown.jsx';
import Reviews from './R_ratingsReviews_subs/Reviews.jsx';

const RatingsReviews = ({product}) => {
  // console.log("R&R ID", product.id)

  return (
    <div className='ratings-reviews'>
      Ratings and Reviews
      <Breakdown productID={product.id}/>
      <Reviews productID={product.id}/>
    </div>
  )
}

export default RatingsReviews;