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

  return (
    <div>
      <div>
        <span>{stats.ratings.avg}</span>
        <span>★★★★★</span>
      </div>
      <div>
        {stats.recommended}% of reviews recommended this product
      </div>
      <div>
        <div>
          <span>5 stars</span>
          <span> {stats.ratings['5']}% of bar</span>
        </div>
        <div>
          <span>4 stars</span>
          <span> {stats.ratings['4']}% of bar</span>
        </div>
        <div>
          <span>3 stars</span>
          <span> {stats.ratings['3']}% of bar</span>
        </div>
        <div>
          <span>2 stars</span>
          <span> {stats.ratings['2']}% of bar</span>
        </div>
        <div>
          <span>1 stars</span>
          <span> {stats.ratings['1']}% of bar</span>
        </div>
      </div>
    </div>
  )
}

export default RatingsBrk;
