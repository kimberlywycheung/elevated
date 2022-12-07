import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortReviews from './SortReviews.jsx'
import ListReviews from './ListReviews.jsx'
import AddReviews from './AddReviews.jsx'

const Reviews = function Reviews({ productID, name, starFilter }) {
  const [reviews, setReviews] = useState({});
  const [displayCount, setDisplayCount] = useState(2);
  const [sort, setSort] = useState('relevant');

  const setReviewList = function() {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productID}&page=1&count=200&sort=${sort}`, {
      headers: { Authorization: process.env.GITHUB_TOKEN },
    })
      .then((result) => {
        // console.log('REVIEW State', result.data)
        setReviews(result.data);
      })
      .catch((err) => {
        // console.log('Error fetching data in "Breakdown.jsx"', err);
        alert('Error in Breakdown.jsx', err);
      });
  };

  useEffect(() => {
    setReviewList();
  }, [productID, sort]);

  if (!reviews.product) {
    return <div>loading...</div>
  }

  return (
    <div>
      <SortReviews reviews={reviews} setSort={setSort}/>
      <ListReviews reviews={reviews} displayCount={displayCount} setRList={setReviewList} starFilter={starFilter}/>
      <div>
        { (reviews.count - displayCount >= 2) &&
          <button onClick={() => setDisplayCount(displayCount + 2)}>
            More Reviews
          </button>
        }
        <AddReviews id={productID} name={name}/>
      </div>
    </div>
  );
};

export default Reviews;
