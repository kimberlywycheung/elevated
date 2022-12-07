import React, { useState } from 'react';
import axios from 'axios';
import Breakdown from './R_ratingsReviews_subs/Breakdown.jsx';
import Reviews from './R_ratingsReviews_subs/Reviews.jsx';

const RatingsReviews = ({product}) => {
  const [starFilter, setStarFilter] = useState(
    {
      inUse: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    }
  );

  const ratingsArray = function(rating) {
    const adjustedFilter = {...starFilter}
    let truthy = 0;
    adjustedFilter[rating] = !adjustedFilter[rating];
    for (let key in adjustedFilter) {
      if (adjustedFilter[key] === true && key !== 'inUse') {
        truthy++
      }
    }
    if (truthy === 0) {
      adjustedFilter.inUse = false;
    } else {
      adjustedFilter.inUse = true;
    }
    setStarFilter(adjustedFilter);
  }

  if(!product.id) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className='ratings-reviews'>
      <Breakdown productID={product.id} ratingsArray={ratingsArray}/>
      <Reviews productID={product.id} name={product.name} starFilter={starFilter}/>
    </div>
  )
}

export default RatingsReviews;