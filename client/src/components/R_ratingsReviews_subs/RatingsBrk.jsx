import React, { useState, useEffect } from 'react';
import starArray from '../../helperFunctions/starArray.js'

const RatingsBrk = function RatingsBrk({ breakdown, ratingsArray }) {
  const [stats, setStats] = useState({});

  const ratingStats = function avgRating() {
    const statsObj = {};
    statsObj.recommended = recommendedPercent(breakdown.recommended);
    statsObj.ratings = starRatingObj(breakdown.ratings)
    return statsObj;
  }

  const recommendedPercent = function recPerc(obj) {
    let rawNum = Number.parseInt(obj.true) / (Number.parseInt(obj.true) + Number.parseInt(obj.false));
    let percent = Math.round(rawNum * 100);
    return percent;
  }

  const starRatingObj= function starRating(obj) {
    let overallRatings = 0
    let totalRatings = 0;
    const result = {}
    for (let key in obj) {
      totalRatings += Number.parseInt(obj[key]);
      overallRatings += Number.parseInt(obj[key]) * Number.parseInt(key);
    }
    for (let key in obj) {
      let rawNum = Number.parseInt(obj[key]) / totalRatings
      let percent = Math.round(rawNum * 1000) / 10;
      result[key] = percent;
    }
    result.avg = Math.round((overallRatings / totalRatings) * 10) / 10;
    return result;
  }

  const clickHandler = function(e, rating) {
    e.preventDefault()
    ratingsArray(rating)
  }

  useEffect(() => {
    setStats(ratingStats())
  }, [breakdown])

  if (!stats.ratings) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <div className="rating-and-stars">
        <h1>{stats.ratings.avg}</h1>
        <span>
          {starArray(stats.ratings.avg).map((item, i) => {
            return (
              <div className="single-star-container" key={i}>
                <div className="single-star-fill" style={{"width" : `${parseInt(item*20.3)}px`}}>
                  <img className="single-star-outline" src="../../client/dist/images/star2.png" alt="stars alt"></img>
                </div>
              </div>
            );
          })}
        </span>
      </div>
      <div>
        {stats.recommended}% of reviews recommended this product
      </div>
      <div>
        <div onClick={(e) => clickHandler(e, 5)}>
          <span>5 stars</span>
          <div className="barContainerStyles">
            <div className="barFillerStyles" style={{"width": stats.ratings['5']/100*120}}>
              <span className="barLabelStyles">{stats.ratings['5']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 4)}>
          <span>4 stars</span>
          <div className="barContainerStyles">
            <div className="barFillerStyles" style={{"width": stats.ratings['4']/100*120}}>
              <span className="barLabelStyles">{stats.ratings['4']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 3)}>
          <span>3 stars</span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": stats.ratings['3']/100*120}}>
              <span className="barLabelStyles">{stats.ratings['3']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 2)}>
          <span>2 stars</span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": stats.ratings['2']/100*120}}>
              <span className="barLabelStyles">{stats.ratings['2']}%</span>
            </div>
          </div>
        </div>
        <div>
          <span onClick={(e) => clickHandler(e, 1)}>1 stars</span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": stats.ratings['1']/100*120}}>
              <span className="barLabelStyles">{stats.ratings['1']}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsBrk;
