import React, {useEffect, useState} from "react";
import RatingsBrk from './RatingsBrk.jsx';
import ProductBrk from './ProductBrk.jsx';
import axios from "axios";

const Breakdown = ({ productID, ratingsArray, setCharBreak, starFilter }) => {
  const [breakdown, setBreakdown] = useState({});

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${productID}`, {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
      .then((result) => {
        // console.log("BREAKDOWN State", result.data)
        setBreakdown(result.data)
        setCharBreak(result.data)
      })
      .catch((err) => {
        // console.log("Error fetching data in 'components/R_ratingsReviews_subs/Breakdown.jsx'", err)
        alert('Error in Breakdown.jsx')
      })
  }, [productID]);

  if (!breakdown.product_id) {
    return <div>loading...</div>
  }

  return (
    <div className="breakdown-cont">
      <RatingsBrk breakdown={breakdown} ratingsArray={ratingsArray} starFilter={starFilter}/>
      <div>
        {Object.keys(breakdown.characteristics).map((char) => {
          return <ProductBrk key={breakdown.characteristics[char].id} char={char} breakdown={breakdown.characteristics} />
        })}
      </div>
    </div>
  )
}

export default Breakdown;