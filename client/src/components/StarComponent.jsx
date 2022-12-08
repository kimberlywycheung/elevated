import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarComponent = ({ productID, avg }) => {
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    if (avg) {
      setAvgRating(avg)
    } else {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${productID}`, {
          headers: { 'Authorization': process.env.GITHUB_TOKEN }
        })
          .then((result) => {
            console.log("please work ", result.data.ratings)
            setAvgRating(starRating(result.data.ratings))
          })
          .catch((err) => {
            // console.log("Error fetching data")
            alert('Error in StarComponent.jsx')
          })
    }
  }, [productID, avg])

  const starRating = function starRating(obj) {
    let overallRatings = 0
    let totalRatings = 0;
    const result = {}
    for (let key in obj) {
      totalRatings += Number.parseInt(obj[key]);
      overallRatings += Number.parseInt(obj[key]) * Number.parseInt(key);
    }
    return Math.round((overallRatings / totalRatings) * 10) / 10;
  }

  const starArray = function (starRating) {
    let rating = starRating || 0;
    let stars = [];
    while (stars.length < 5) {
      if (rating > 1) {
        stars.push(1);
      } else if (rating > 0) {
        let empty = Math.abs(0 - rating);
        let quart = Math.abs(0.25 - rating);
        let half = Math.abs(0.5 - rating);
        let three = Math.abs(0.75 - rating);
        let full = Math.abs(1 - rating);
        let closest = Math.min(empty, quart, half, three, full);
        switch (closest) {
          case (empty):
            stars.push(0);
            break;
          case quart:
            stars.push(0.28);
            break;
          case half:
            stars.push(0.5);
            break;
          case three:
            stars.push(0.72);
            break;
          case full:
            stars.push(1.0);
            break;
          default:
            console.log("OOPS");
            stars.push(0);
            break;
        }
      } else {
        stars.push(0);
      }
      rating = rating - 1;
    }
    return stars;
  }

  return (
    <span className="star-span">
      {starArray(avgRating).map((item, i) => {
        return (
          <div className="single-star-container" key={i}>
            <div className="single-star-fill" style={{"width" : `${parseInt(item*20.3)}px`}}>
              <img className="single-star-outline" src="../../client/dist/images/star2.png" alt="stars alt"></img>
            </div>
          </div>
        );
      })}
    </span>
  )
};

export default StarComponent;