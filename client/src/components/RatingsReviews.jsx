import React from 'react';
import axios from 'axios';
import Breakdown from './R_ratingsReviews_subs/Breakdown.jsx';
import Reviews from './R_ratingsReviews_subs/Reviews.jsx';

const RatingsReviews = ({product}) => {
  // console.log("R&R ID", product.id)
  if(!product.id) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className='ratings-reviews'>
      <Breakdown productID={product.id}/>
      <Reviews productID={product.id} name={product.name}/>
    </div>
  )

}

export default RatingsReviews;