import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StarSpan = styled.span`
  display: flex;
  flex-direction: row;
  // width: ${props => props.dimension.height * 6}px;
  // height: ${props => props.dimension.height + 5}px;
`

const SingleStarContainer = styled.div`
  // height: ${props => props.dimension.height}px;
  // width: ${props => props.dimension.width}px;
  display: inline-block;
`

// const SingleStarFill = styled.div`
//   position: relative;
//   display: inline-block;
//   height: ${props => props.dimension.height}px;
//   background-color: black;
// `

// const StarImg = styled.img`
//   height: ${props => props.dimension.height}px;
//   width: ${props => props.dimension.width}px;
// `

const StarIcon = styled.i`
  display: inline-block;
  position: relative;
  font-size: ${props => props.font}px;
  color: ${props => props.theme.h2};
    &:after {
      font-family: FontAwesome;
      content: "\f005";
      position: absolute;
      left: 0;
      top: 0;
      width: ${props => props.percent}%;
      overflow: hidden;
      color: ${props => props.theme.fontColor};
    }
`

const StarComponent = ({ theme, productID, avg, size, font }) => {
  const [avgRating, setAvgRating] = useState(0)
  console.log(font);
  const font_size = font || 14;
  console.log(font_size);
  let dimension = {
    height: 24,
    width: 20.3
  };
  if (size) {
    dimension = size;
  }

  useEffect(() => {
    if (avg) {
      setAvgRating(avg)
    } else {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${productID}`, {
          headers: { 'Authorization': process.env.GITHUB_TOKEN }
        })
          .then((result) => {
            //console.log("please work ", result.data.ratings)
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
    <StarSpan dimension={dimension}>
      {starArray(avgRating).map((item, i) => {
        return (
          // <SingleStarContainer dimension={dimension} key={i}>
            <StarIcon theme={theme} className="far fa-star" font={font_size} percent={item*100}></StarIcon>
          //   {/* <SingleStarFill dimension={dimension}
          //     style={{"width" : `${parseInt(item*dimension.width)}px`}}>
          //     <StarImg dimension={dimension} src="./images/star2.png" alt="stars alt"></StarImg>
          //   </SingleStarFill>
          // </SingleStarContainer> */}
        );
      })}
    </StarSpan>
  )
};

export default StarComponent;
