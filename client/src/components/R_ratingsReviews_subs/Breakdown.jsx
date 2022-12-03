import React, {useEffect, useState} from "react";
import axios from "axios";

const Breakdown = ({ productID }) => {
  const [breakdown, setBreakdown] = useState({});

  useEffect(() => {
    // console.log('Compare ', productID !== undefined)
    if (productID !== undefined) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${productID}`, {
        headers: { 'Authorization': process.env.GITHUB_TOKEN }
      })
        .then((result) => {
          // console.log("BREAKDOWN State", result.data)
          setBreakdown(result.data)
        })
        .catch((err) => {
          // console.log("Error fetching data in 'components/R_ratingsReviews_subs/Breakdown.jsx'", err)
          alert('Error in Breakdown.jsx')
        })
    }
  }, [productID]);

  return (
    <div>
      Product Breakdown and Ratings Breakdown
    </div>
  )
}

export default Breakdown;