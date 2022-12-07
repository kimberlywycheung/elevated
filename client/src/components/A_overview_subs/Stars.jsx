import React from "react";
import axios from 'axios';


const Stars = ({ id }) => {
  const [rating, setRating] = React.useState('null') //AVERAGE rating

  const getRatings = async () => {

    if (id) {
      const { data: { ratings } } = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${id}`, { //destructured total ratings get
        headers: { Authorization: process.env.GITHUB_TOKEN }
      }) //ratings example: {1: "94", 2: "105", 3: "276", 4: "205", 5: "471"}
      let starSum = 0; //total number of RATED stars; multiply ratings object value by key
      let reviewTotal = 0; // total number of REVIEWS; add ratings object values
      let avgStars; // starSum divided by reviewTotal

      const roundNearQtr = function (number) { //rounds star avg to nearest 1/4th
        return (Math.round(number * 4) / 4).toFixed(2);
      };

      for (const key in ratings) {
        reviewTotal += Number(ratings[key]);
        starSum += Number(ratings[key] * key);
      }

      avgStars = starSum / reviewTotal;
      let roundedAvgStars = roundNearQtr(avgStars);
      /*
      EXAMPLE:
      A gives 1 star rating
      B gives 5 star rating
      starSum = 6
      reviewTotal = 2
      avgStars = 3
      */
  
      setRating(roundedAvgStars);
    }
   
  }
  React.useEffect(() => {
    getRatings();
  }, []);

  let ratingPercentage = String(rating / 5) + '%';


// BROKEN: how can I get width inside of the style tag?
  return (<div>{ratingPercentage ? <div className="ov-review">
    <div className="fill-ratings" style={{ width: { ratingPercentage } }}>
      <span>★★★★★</span>
    </div>
    <div className="empty-ratings">
      <span>★★★★★</span>
    </div>
  </div> : null}</div>


  );
}
export default Stars;