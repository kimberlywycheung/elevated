import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';

const ReviewModal = function ReviewModal({ isOpen, name, id, setIsOpen, charBreak, setRList }) {
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [body, setBody] = useState('');
  const [starArray, setStarArray] = useState([1, 0, 0, 0, 0]);
  // const [starCount, setStarCount] = useState(1);
  const [currentSelection, setCurrentSelection] = useState({
    Size: 0,
    Width: 0,
    Comfort: 0,
    Quality: 0,
    Length: 0,
    Fit: 0
  })

  if (!charBreak.characteristics) {
    return null;
  }


  const chars = Object.keys(charBreak.characteristics);
  const charObj = charBreak.characteristics;
  const charChart = {
    Size: ['None selected', 'A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['None selected', 'Too narrow', 'Slightly Narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['None selected', 'Uncomfortable', 'Slightyly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['None selected', 'Poor', 'Below average', 'What I expected', 'Pretty Great', 'Perfect'],
    Length: ['None selected', 'Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['None selected', 'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose']
  }

  const handleSelect = function(e, currentChar) {
    const newCurrentSelection = {...currentSelection};
    newCurrentSelection[currentChar] = parseInt(e.target.value);
    setCurrentSelection(newCurrentSelection);
  }

  const handleBody = function(e) {
    e.preventDefault()
    setBody(e.target.value)
  }

  const handleStars = function(e, position) {
    let stars = parseInt(e.target.value);
    // console.log('Stars ', stars);
    let updatedStarArray = [...starArray].map((star) => {
      if (stars > 0) {
        stars--;
        return 1;
      } else {
        return 0;
      }
    })
    // console.log(updatedStarArray);
    // setStarCount(parseInt(e.target.value));
    setStarArray(updatedStarArray);
  }

  const formSubmit = function(e) {
    e.preventDefault()
    let newReview = new FormData(e.target);
    let newObj = createParameters(newReview)
    console.log(newObj);
    if (newObj) {
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`;
      axios({method: 'post', url: url, headers: auth, data: newObj})
        .then((res) => {
          console.log('review POST response', res);
          setRList();
        })
        .catch(err => {
          console.error('ERROR', err);
          alert('Didn\'t Post Review' + err);
        })
    }
    setIsOpen(false);
    setImages([]);
    setCurrentSelection({
      Size: 0,
      Width: 0,
      Comfort: 0,
      Quality: 0,
      Length: 0,
      Fit: 0
    })
    setBody('')
    setStarArray([1, 0, 0, 0, 0])
  }

  const createParameters = function(formData) {
    let parameters = {product_id: id, characteristics: {}}
    let charID = []
    for (let key in charObj) {
      charID.push(charObj[key].id);
    }
    for (const [key, value] of formData) {
      if (charID.includes(parseInt(key))) {
        parameters.characteristics[key] = parseInt(value)
      } else if (key === 'rating') {
        parameters[key] = parseInt(value)
      } else if (key === 'recommend') {
        parameters[key] = (value === 'true')
      } else if (key === 'photos') {
        parameters[key] = images;
      } else {
        parameters[key] = value
      }
    }
    return parameters;
  }

  const imagehandler = function(e, action) {
    e.preventDefault();
    let imgUrl = $('#photos').val();
    const updatedImages = [...images]
    if (action === 'add') {
      updatedImages.push(imgUrl)
    } else if (action === 'del') {
      updatedImages.pop()
    }
    setImage('');
    setImages(updatedImages);
  }

  // console.log(starArray);

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className='qa-modal modal-bg'>
      <span onClick={(e) => {e.preventDefault(); setIsOpen(false)}} id='pop-up-exit'>X</span>
      <div className='modal-content review-modal-specs'>
        <div className="form-header">
          <span>Write your review about the <span className="form-product">{name}</span></span>
        </div>
        <form id="addReview" className="scroll" onSubmit={formSubmit}>
        <div className="form-rating-container">
            <label className="form-category-font">
              * Overall Rating:
            </label>
            <div className="form-star-def-cont">
              <div className="form-star-cont">
                {starArray.map((star, index) => {
                  // console.log(index, (index + 1) === starCount, starCount)
                  return (
                    <span key={index}>
                      <input
                        type="radio"
                        value={index + 1}
                        id={`star-${index+1}`}
                        name="rating"
                        className="form-star-radio-button"
                        // defaultChecked={(index + 1) === starCount}
                        defaultChecked={index === 0}
                        onChange={(e) => handleStars(e)}
                        required>
                      </input>
                      <label htmlFor={`star-${index+1}`}>
                        <div className="single-star-container">
                          <div
                            className="single-star-fill"
                            style={{"width" : `${parseInt(star*20.3)}px`}}>
                            <img
                              className="single-star-outline"
                              src="../../client/dist/images/star2.png" alt="stars alt">
                            </img>
                          </div>
                        </div>
                      </label>
                    </span>
                  )
                })}
              </div>
              <div className="form-star-def">
                <span>5: Great</span>
                <span>4: Good</span>
                <span>3: Average</span>
                <span>2: Fair</span>
                <span>1: Poor</span>
              </div>
            </div>
          </div>
          <div>
            <div className="form-recommend form-category-font">
              <label>* Do you recommend this product?</label>
            </div>
            <div className="form-recommend-input font">
              <input type="radio" id="yes" name="recommend" value="true" required></input>
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="recommend" value="false"></input>
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="form-char-cont">
            <div
              className="form-category-font">
              * Characteristics:
            </div>
            {chars.length === 0 && <div>No characteristics at this time</div>}
            <div className="form-ind-char-cont">
              {chars.length >= 1 &&
                chars.map((char, index) => {
                  return (
                    <div className="form-ind-char font" key={index}>
                      <div style={{"marginRight": "60px"}}>
                        <label>
                          {char}:
                          <span style={{"marginLeft": "5px"}} className="form-char-selected">
                              {charChart[char][currentSelection[char]]}
                          </span>
                        </label>
                        <div>
                          <input
                            type="radio"
                            value="1"
                            id={`${char}-1`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}
                            required>
                          </input>
                          <label htmlFor={`${char}-1`}>1</label>
                          <input
                            type="radio"
                            value="2"
                            id={`${char}-2`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </input>
                          <label htmlFor={`${char}-2`}>2</label>
                          <input
                            type="radio"
                            value="3"
                            id={`${char}-3`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </input>
                          <label htmlFor={`${char}-3`}>3</label>
                          <input
                            type="radio"
                            value="4"
                            id={`${char}-4`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </input>
                          <label htmlFor={`${char}-4`}>4</label>
                          <input
                            type="radio"
                            value="5"
                            id={`${char}-5`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </input>
                          <label htmlFor={`${char}-5`}>5</label>
                        </div>
                      </div>
                      <div className="form-char-def">
                        <span>1: {charChart[char][1]}</span>
                        <span>2: {charChart[char][3]}</span>
                        <span>3: {charChart[char][5]}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="single-line-input">
            <label className="form-category-font">
              * Review Summary:
            </label>
            <input className="single-line-input-specs" type="text" name="summary" placeholder="Best purchase ever!!!" maxLength="60" required></input>
          </div>
          <div className="form-body-cont">
            <label className="form-category-font">
              * Review Body:
            </label>
            <div className="form-body-input">
              <textarea
                name="body"
                minLength="50"
                maxLength="1000"
                value={body}
                onChange={handleBody}
                placeholder="Why did you like the product or not?"
                required>
              </textarea>
              { body.length < 50 &&
                <span className="font">Minimum required characters left: [{50-body.length}]</span>
              }
              { body.length > 50 &&
                <span className="font">Minimum Reached</span>
              }
            </div>
          </div>
          <div className="form-photos-cont">
            <label className="form-category-font">
              Upload Photos:
            </label>
            <input
              className="single-line-input-specs"
              name="photos"
              id="photos"
              type="input"
              value={image}
              onChange={(e) => {setImage(e.target.value)}}
              placeholder={`You can add ${5 - images.length} more images!`}>
            </input>
            <div className="form-buttons-container">
              {images.length < 5 &&
                <span
                  style={{"border": "gray solid 3px"}}
                  onClick={(e) => imagehandler(e, 'add')}>
                  Add Image
                </span>
              }
              {images.length > 0 &&
                <span
                  style={{"border": "gray solid 3px"}}
                  onClick={(e) => imagehandler(e, 'del')}>
                  Remove Image: [{images.length}]
                </span>
              }
            </div>
          </div>
          <div className="form-name-email-cont">
            <div className="single-line-input">
              <label className="form-category-font">
                * Nickname:
              </label>
              <input className="single-line-input-specs" type="text" name="name" placeholder="jackson11" maxLength="60" required></input>
            </div>
            <div className="form-warning font">
              For privacy reasons do not use your real name or email.
            </div>
          </div>
          <div className="form-name-email-cont">
            <div className="single-line-input">
              <label className="form-category-font">
                * email:
              </label>
              <input className="single-line-input-specs" type="email" name="email" placeholder="jackson11@gmail.com" maxLength="60" required></input>
            </div>
            <div className="form-warning font">
              For authentication reasons, you will not be emailed.
            </div>
          </div>
          <input
            style={{"border": "gray solid 3px", "borderRadius": "5px"}}
            className="form-buttons-container font"
            type="submit"
            value="Submit">
          </input>
        </form>
      </div>
    </div>,
    document.getElementById('pop-up')
  )
}

export default ReviewModal;
