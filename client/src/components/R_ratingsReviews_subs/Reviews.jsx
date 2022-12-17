import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortReviews from './SortReviews.jsx';
import ListReviews from './ListReviews.jsx';
import AddReviews from './AddReviews.jsx';
import $ from 'jquery';
import styled from 'styled-components';

const Reviews = function Reviews({ theme, productID, name, starFilter, charBreak }) {
  const [reviews, setReviews] = useState({});
  const [displayCount, setDisplayCount] = useState(2);
  const [sort, setSort] = useState('relevant');

  const setReviewList = function() {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productID}&page=1&count=50&sort=${sort}`, {
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

  const addMoreReviews = function(e) {
    e.preventDefault();
    setDisplayCount(displayCount + 2);
    $(".reviewList").animate({ scrollTop: $('.reviewList')[0].scrollHeight}, 1000);
  }

  if (!reviews.product) {
    return <div>loading...</div>
  }

  return (
    <ReviewCont>
      <SortReviews reviews={reviews} setSort={setSort}/>
      <ListReviews theme={theme} reviews={reviews} displayCount={displayCount} setRList={setReviewList} starFilter={starFilter}/>
      <div>
        { (reviews.count - displayCount >= 1) &&
          <button onClick={addMoreReviews}>
            More Reviews
          </button>
        }
        <AddReviews id={productID} name={name} charBreak={charBreak} setRList={setReviewList}/>
      </div>
    </ReviewCont>
  );
};

export default Reviews;

const ReviewCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  padding: 2%;
`