import React, { useState, useEffect } from 'react';
import StarComponent from '../StarComponent.jsx';

const RatingsBrk = function RatingsBrk({ breakdown, ratingsArray, starFilter }) {
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
        <span className="rating-span">{stats.ratings.avg}</span>
        <StarComponent productID={breakdown.product_id} avg={stats.ratings.avg}/>
      </div>
      <div className="rec-statement">
        {stats.recommended}% of reviews recommended this product
      </div>
      <div className="barRatingsContainer">
        <div onClick={(e) => clickHandler(e, 5)}>
          <span style={{"textDecoration": `${starFilter[5] ? 'underline': 'none'}`}}>
            5 stars
          </span>
          <div className="barContainerStyles">
            <div
              className="barFillerStyles"
              style={{"width": `${stats.ratings['5']/100*120}%`}}>
              <span className="barLabelStyles">{stats.ratings['5']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 4)}>
          <span style={{"textDecoration": `${starFilter[4] ? 'underline': 'none'}`}}>
            4 stars
          </span>
          <div className="barContainerStyles">
            <div className="barFillerStyles" style={{"width": `${stats.ratings['4']/100*120}%`}}>
              <span className="barLabelStyles">{stats.ratings['4']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 3)}>
          <span style={{"textDecoration": `${starFilter[3] ? 'underline': 'none'}`}}>
            3 stars
          </span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": `${stats.ratings['3']/100*120}%`}}>
              <span className="barLabelStyles">{stats.ratings['3']}%</span>
            </div>
          </div>
        </div>
        <div onClick={(e) => clickHandler(e, 2)}>
          <span style={{"textDecoration": `${starFilter[2] ? 'underline': 'none'}`}}>
            2 stars
          </span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": `${stats.ratings['2']/100*120}%`}}>
              <span className="barLabelStyles">{stats.ratings['2']}%</span>
            </div>
          </div>
        </div>
        <div  onClick={(e) => clickHandler(e, 1)}>
          <span style={{"textDecoration": `${starFilter[1] ? 'underline': 'none'}`}}>
            1 stars
          </span>
          <div className="barContainerStyles">
            <div className="barFillerStyles"  style={{"width": `${stats.ratings['1']/100*120}%`}}>
              <span className="barLabelStyles">{stats.ratings['1']}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsBrk;
