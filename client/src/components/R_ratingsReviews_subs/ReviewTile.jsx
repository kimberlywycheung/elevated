import React from 'react';
import axios from 'axios';
import starArray from '../../helperFunctions/starArray.js'

const ReviewTile = function ReviewTile({ review, setRList }) {
  let date = new Date(review.date)

  const handleVote = (e) => {
    e.preventDefault()
    if(window.localStorage.getItem(`voted${review.review_id}`) === null) {
      window.localStorage.setItem(`voted${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/helpful`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
        .then(res => {
          console.log('response', res);
          setRList(review.review_id);
        })
        .catch(err => {
          console.log('error', err);
        })
    }
  };

  const handleReport = (e) => {
    e.preventDefault()
    if(window.localStorage.getItem(`reported${review.review_id}`) === null) {
      window.localStorage.setItem(`reported${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/report`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
        .then(res => {
          console.log('reported');
          console.log('response', res);
          setRList();
        })
        .catch(err => {
          console.log('error', err);
        })
    }
  }

  return (
    <div style={{border: "1px solid red"}}>
      <div>
        <span>
          <span>{review.rating}</span>
          <span>
              {starArray(review.rating).map((item, i) => {
                  return (
                      <div className="single-star-container" key={i}>
                          <div className="single-star-fill" style={{"width" : `${parseInt(item*20.3)}px`}}>
                              <img className="single-star-outline" src="../../client/dist/images/star2.png" alt="stars alt"></img>
                          </div>
                      </div>
                  );
              })}
          </span>
        </span>
        <span>{date.toLocaleDateString()}</span>
      </div>
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
      <span>Helpful? <a onClick={handleVote}>Yes</a> ({review.helpfulness}) | <a onClick={handleReport}>Report</a></span>
    </div>
  )
}

export default ReviewTile;
