import React, { useEffect, useState } from 'react';
import axios from 'axios';
import starArray from '../../helperFunctions/starArray.js';
import ImgView from './ImgView.jsx';

const ReviewTile = function ReviewTile({ review, setRList }) {
  const [photosArr, setPhotosArr] = React.useState([]);
  const [imgViewStyle, setImgViewStyle] = React.useState({display: 'none'});
  const [imgUrl, setImgUrl] = React.useState('');
  let date = new Date(review.date)

  const handleVote = (e) => {
    e.preventDefault()
    if(window.localStorage.getItem(`voted${review.review_id}`) === null) {
      window.localStorage.setItem(`voted${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/helpful`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
        .then(res => {
          console.log('response', res);
          setRList(review.review_id);
        })
        .catch(err => {
          console.log('error', err);
        })
    }
  };

  console.log(review);

  const handleReport = (e) => {
    e.preventDefault()
    if(window.localStorage.getItem(`reported${review.review_id}`) === null) {
      window.localStorage.setItem(`reported${review.review_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review.review_id}/report`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
        .then(res => {
          console.log('response', res);
          setRList();
        })
        .catch(err => {
          console.log('error', err);
        })
    }
  }

  const openImg = (url) => {
    console.log('opening image with url ', url);
    setImgUrl(url);
    setImgViewStyle({display: 'block'});
  };

  React.useEffect(() => {
    if(review.photos.length) {
      var photoInput = [];

      review.photos.forEach((photo, i) => {
        // console.log('photo', photo, typeof photo);
        var photoUrl = typeof photo === 'object' ? photo.url : photo;
        var photoID = typeof photo === 'object' ? photo.id : Number((review.review_id + '')+i);

        photoInput.push(
          <img onClick={e => {e.preventDefault(); openImg(photoUrl)}} className='a-thumbnails' key={photoID} src={photoUrl} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.style.display = 'none';
            currentTarget.src="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
          }}></img>
        )
//"this.onerror=null; this.src='https://placeimg.com/200/300/animals';"
      });
      setPhotosArr(photoInput);
    }
  },[review]);

  return (
    <div style={{border: "1px solid red"}}>
      <div>
        <span>
          <span>{review.rating}</span>
          <span>
            {starArray(review.rating).map((item, i) => {
              if (item > 0) {
                return (
                  <div className="single-star-container" key={i}>
                    ★
                  </div>
                );
              }
            })}
            {/* {starArray(review.rating).map((item, i) => {
              return (
                <div className="single-star-container" key={i}>
                  <div className="single-star-fill" style={{"width" : `${parseInt(item*20.3)}px`}}>
                    <img className="single-star-outline" src="../../client/dist/images/star2.png" alt="stars alt"></img>
                  </div>
                </div>
              );
            })} */}
          </span>
        </span>
        <span>{date.toLocaleDateString()}</span>
      </div>
      <h3>{review.reviewer_name}</h3>
      {review.recommend === true &&
        <div>
          ✔ I recommended this product
        </div>
      }
      <h3>{review.summary}</h3>
      <div>
        <div>{review.body}</div>
        <div className='photo-div'>{photosArr}</div> {/* photo THUMBNAILS HERE */}
      </div>
      {review.response &&
        <div style={{backgroundColor: "gray"}}>
          <h3>Response</h3>
          {review.response}
        </div>
      }
      <span>Helpful? <a onClick={handleVote}>Yes</a> ({review.helpfulness}) | <a onClick={handleReport}>Report</a></span>
      <div>
        <ImgView style={imgViewStyle} setStyle={setImgViewStyle} url={imgUrl}/>
      </div>
      <hr></hr>
    </div>
  )
}

export default ReviewTile;
