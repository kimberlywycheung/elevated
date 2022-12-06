import React, { useState, useEffect } from 'react';

const RatingsBrk = function RatingsBrk({ breakdown }) {
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

  useEffect(() => {
    setStats(ratingStats())
  }, [breakdown])

  if (!stats.ratings) {
    return (
      <div>loading...</div>
    )
  }

  let rating = stats.ratings.avg || 0;
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

  // client/dist/images/star.png

  return (
    <div>
      <div>
        <span>{stats.ratings.avg}</span>
        <span>
          {stars.map((item, i) => {
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
        <div>
          <span>5 stars</span>
          <div className="containerStyles">
            <div className="fillerStyles" style={{"width": stats.ratings['5']/100*120}}>
              <span className="labelStyles">{stats.ratings['5']}%</span>
            </div>
          </div>
        </div>
        <div>
          <span>4 stars</span>
          <div className="containerStyles">
            <div className="fillerStyles" style={{"width": stats.ratings['4']/100*120}}>
              <span className="labelStyles">{stats.ratings['4']}%</span>
            </div>
          </div>
        </div>
        <div>
          <span>3 stars</span>
          <div className="containerStyles">
            <div className="fillerStyles"  style={{"width": stats.ratings['3']/100*120}}>
              <span className="labelStyles">{stats.ratings['3']}%</span>
            </div>
          </div>
        </div>
        <div>
          <span>2 stars</span>
          <div className="containerStyles">
            <div className="fillerStyles"  style={{"width": stats.ratings['2']/100*120}}>
              <span className="labelStyles">{stats.ratings['2']}%</span>
            </div>
          </div>
        </div>
        <div>
          <span>1 stars</span>
          <div className="containerStyles">
            <div className="fillerStyles"  style={{"width": stats.ratings['1']/100*120}}>
              <span className="labelStyles">{stats.ratings['1']}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsBrk;
