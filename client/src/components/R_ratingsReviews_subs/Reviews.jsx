import React, {useState, useEffect} from "react";
import axios from "axios";

const Reviews = ({productID}) => {
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    if (productID !== undefined) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productID}`, {
        headers: { 'Authorization': process.env.GITHUB_TOKEN }
      })
        .then((result) => {
          // console.log('REVIEW State', result.data)
          setReviews(result.data)
        })
        .catch((err) => {
          // console.log("Error fetching data in 'components/R_ratingsReviews_subs/Breakdown.jsx'", err)
          alert('Error in Breakdown.jsx')
        })
    }
  }, [productID]);

  return (
    <div>
      Reviews list, sort, and add review button
    </div>
  )
}

export default Reviews;