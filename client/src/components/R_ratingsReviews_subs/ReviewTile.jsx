import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImgView from '../E_qa_subs/ImgView.jsx';
import StarComponent from '../StarComponent.jsx';
import styled from 'styled-components';

const ReviewTile = function ReviewTile({ review, setRList, productID }) {
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
    <RT>
      <RTHead>
        <span>
          <StarComponent productID={productID} avg={review.rating}/>
        </span>
        <span>{date.toLocaleDateString()}</span>
      </RTHead>
      <RTContent>
        <RTUser>
          <span><By>by</By> {review.reviewer_name}</span>
          {review.recommend === true &&
            <div>
              ✔ I recommended this product
            </div>
          }
        </RTUser>
        <RTBody>
          <span>
            {review.summary}
          </span>
          <div>
            <RTBodyBody>{review.body}</RTBodyBody>
            <PhotoDiv>{photosArr}</PhotoDiv>
            {review.response &&
              <RTResponse>
                <span>Response:</span>
                <div>{review.response}</div>
              </RTResponse>
            }
          </div>
        </RTBody>
      </RTContent>
      <RTHelpful>Helpful? <a onClick={handleVote}>Yes</a> ({review.helpfulness}) | <a onClick={handleReport}>Report</a></RTHelpful>
      <div>
        <ImgView style={imgViewStyle} setStyle={setImgViewStyle} url={imgUrl}/>
      </div>
    </RT>
  )
}

export default ReviewTile;


const RT = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 1px;
  background-color: white;
  max-height: 250px;
`

const RTHead = styled.div`
  display: flex;
  justify-content: space-between;
`

const RTContent = styled.div`
  padding: 5px;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const RTUser = styled.div`
  font-size: 14px ;
    & > {
      font-size: 10px;
      font-weight: bold;
      padding-left: 5px;
      margin-bottom: 5px;
      color: grey;
    }
`

const By = styled.span`
  font-size: 10px;
`

const RTBody = styled.div`
  height: 80%;
  padding: 5px;
  overflow: auto;
    & > div {
      margin: 5px 0px;
      height: 65%;
    }
    & > span {
      font-size: 20px;
      height: 30%;
      text-decoration: underline;
    }
`

const RTBodyBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`

const RTResponse = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding-left: 10px;
    & > span {
      font-size: 20px;
    }
    & > div {
      font-size: 14px;
      margin-top: 5px;
    }
`

const PhotoDiv = styled.div`
padding-left: 20px;
width: 400px;
max-height: 100px;
overflow-x: visible;
overflow-y: hidden;
`;


const RTHelpful = styled.span`
  font-size: 13px;
  color: grey;
`