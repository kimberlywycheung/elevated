import React from 'react';
import axios from 'axios';
import ImgView from './ImgView.jsx';
import styled from "styled-components";

  //STYLED COMPONENTS
  const AnsBody = styled.span`
  padding-left: 20px;
  display: block;
  margin-bottom: 15px;
  `;
  const Ans = styled.div`
  padding-left: 20px;
  font-size: 1em;
  `;
  const Athumbnails = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border: solid rgb(229, 229, 229) .5px;
  `;
  const PhotoDiv = styled.div`
  padding-left: 20px;
  width: 400px;
  max-height: 100px;
  overflow-x: visible;
  overflow-y: hidden;
  `;
  const Ameta = styled.div`
  display: flex;
  width: 450px;
  justify-content: space-between;
  font-size: .6em;
  color: grey;
  padding: 10px 0;
  `;


  //end styled components

const Answer = ({a, getAndSetAnswers}) => {
  const [photosArr, setPhotosArr] = React.useState([]);
  const [imgViewStyle, setImgViewStyle] = React.useState({display: 'none'});
  const [imgUrl, setImgUrl] = React.useState('');
  const [helpfulClicked, setHelpfulClicked] = React.useState(['pointer','underline']);


  // console.log('a', a);

  const handleAnsMeta = (type) => { //type == helpful / report
    if(type === 'helpful') {setHelpfulClicked(['default','none'])}
    console.log('local', window.localStorage.getItem(`A${type}${a.answer_id}`));
    if(window.localStorage.getItem(`A${type}${a.answer_id}`) === null) {
      window.localStorage.setItem(`A${type}${a.answer_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${a.answer_id}/${type}`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
      .then(res => {
        console.log(`res for PUT A ${type}->`, res);
        getAndSetAnswers();
      })
      .catch(err => {
        alert(`Error Put request for Answer ${type}\n\n` + err.response.data);
        console.error(err);
      })
    }
  };
  const openImg = (url) => {
    console.log('opening image with url ', url);
    setImgUrl(url);
    setImgViewStyle({display: 'block'});
  };

  React.useEffect(() => {
    if(a.photos.length) {
      var photoInput = [];

      a.photos.forEach((photo, i) => {
        // console.log('photo', photo, typeof photo);
        var photoUrl = typeof photo === 'object' ? photo.url : photo;
        var photoID = typeof photo === 'object' ? photo.id : Number((a.answer_id + '')+i);

        photoInput.push(
          <Athumbnails onClick={e => {e.preventDefault(); openImg(photoUrl)}} key={photoID} src={photoUrl} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.style.display = 'none';
            currentTarget.src="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
          }}></Athumbnails>
        )
//"this.onerror=null; this.src='https://placeimg.com/200/300/animals';"
      });
      setPhotosArr(photoInput);
    }
  },[a]);


  return (
    <Ans>
      <div>
        <span><AnsBody>{a.body}</AnsBody></span>
         <PhotoDiv>{photosArr}</PhotoDiv> {/* photo THUMBNAILS HERE */}
      </div>
      <Ameta>
        <span>by {a.answerer_name}</span>
        <span>{a.date.slice(0,10)}</span>
        <span>|</span>
        <span>Helpful? <a onClick={e => {e.preventDefault(); handleAnsMeta('helpful');}} style={{'paddingRight': '5px', cursor: helpfulClicked[0], textDecoration: helpfulClicked[1]}}>Yes</a>{a.helpfulness}</span>
        <span>|</span>
        <a onClick={e => {e.preventDefault(); handleAnsMeta('report')}} >Report</a>
      </Ameta>
      <div>
        <ImgView style={imgViewStyle} setStyle={setImgViewStyle} url={imgUrl}/>
      </div>
    </Ans>

  )

};

export default Answer;