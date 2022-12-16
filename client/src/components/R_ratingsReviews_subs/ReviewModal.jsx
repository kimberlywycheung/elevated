import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import styled from 'styled-components';

const ReviewModal = function ReviewModal({ isOpen, name, id, setIsOpen, charBreak, setRList }) {
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [body, setBody] = useState('');
  const [rec, setRec] = useState('');
  const [starArray, setStarArray] = useState([1, 0, 0, 0, 0]);
  const [storedStarArray, setStoredStarArray] = useState([1,0,0,0,0])
  const [photosArr, setPhotosArr] = React.useState([]);
  // const [starCount, setStarCount] = useState(1);
  const [currentSelection, setCurrentSelection] = useState({
    Size: 0,
    Width: 0,
    Comfort: 0,
    Quality: 0,
    Length: 0,
    Fit: 0
  })

  useEffect(() => {
    if (images.length) {
      var photoInput = [];
      images.forEach((photo, i) => {
        var photoUrl = typeof photo === 'object' ? photo.url : photo;
        console.log('url ', photoUrl)

        photoInput.push(
          <AllowPhotoDelete key={i}>
            <Athumbnails
              onClick={e => {/*e.preventDefault(); openImg(photoUrl)*/}} key={i} src={photoUrl} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.style.display = 'none';
                currentTarget.src="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
              }}>
            </Athumbnails>
            <span
              onClick={(e) => imageHandler(e, 'del', i)}
              >
              X
            </span>
          </AllowPhotoDelete>
        )
      });
      setPhotosArr(photoInput);
    }
  }, [images])

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

  const handleBool = function(e) {
    console.log(e.target.value);
    if (e.target.value === 'true') {
      setRec('yes')
    } else if (e.target.value === 'false') {
      setRec('no')
    }
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

  const handleStars = function(e, position, event) {
    let stars = parseInt(e.target.value) || position;
    let updatedStarArray = [];
    if (event !== 'leave') {
      updatedStarArray = [...starArray].map((star) => {
        if (stars > 0) {
          stars--;
          return 1;
        } else {
          return 0;
        }
      })
      if (event === 'change') {
        setStoredStarArray(updatedStarArray);
      }
    } else if (event === 'leave') {
      setStarArray(storedStarArray);
      return;
    }
    setStarArray(updatedStarArray);
  }

  const formSubmit = function(e) {
    e.preventDefault()
    let newReview = new FormData(e.target);
    let newObj = createParameters(newReview)
    // console.log(newObj);
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
    setRec('')
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

  const imageHandler = function(e, action, remove) {
    e.preventDefault();
    // let imgUrl = $('#photos').val();
    const updatedImages = [...images]
    if (image.length >= 3 && action === 'add') {
      // updatedImages.push(imgUrl)
      if (image.length === 5) {
        alert("You can only add 5 photos");
      }
      updatedImages.push(image);
    } else if (image.length < 3 && action === 'add') {
      alert('Add a proper image URL');
    }
    if (action === 'del') {
      updatedImages.splice(remove, 1);
    }
    setImage('');
    setImages(updatedImages);
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className='qa-modal modal-bg'>
      <span onClick={(e) => {e.preventDefault(); setIsOpen(false)}} id='pop-up-exit'>X</span>
      <div className='modal-content review-modal-specs'>
        <FormHeader>
          <span>
            Write your review about the <span>{name}</span>
          </span>
        </FormHeader>
        <AddReview onSubmit={formSubmit}>
          <FormRatingCont>
            <label>
              Overall Rating*
            </label>
            <StarAndDefCont>
              <StarCont>
                {starArray.map((star, index) => {
                  return (
                    <span key={index}>
                      <NoRadioButton
                        type="radio"
                        value={index + 1}
                        id={`star-${index+1}`}
                        name="rating"
                        defaultChecked={index === 0}
                        onChange={(e) => handleStars(e, index + 1, 'change')}
                        required>
                      </NoRadioButton>
                      <label htmlFor={`star-${index+1}`}>
                        <SingleStarContainer
                        onMouseEnter={(e) => handleStars(e, index + 1, 'enter')}
                        onMouseLeave={(e) => handleStars(e, index + 1, 'leave')}>
                          <SingleStarFill
                            style={{"width" : `${parseInt(star*40)}px`}}>
                            <StarImg
                              src="./images/star2.png" alt="stars alt">
                            </StarImg>
                          </SingleStarFill>
                        </SingleStarContainer>
                      </label>
                    </span>
                  )
                })}
              </StarCont>
              <StarDef>
                <span>5: Great</span>
                <span>4: Good</span>
                <span>3: Average</span>
                <span>2: Fair</span>
                <span>1: Poor</span>
              </StarDef>
            </StarAndDefCont>
          </FormRatingCont>
          <div>
            <FormRecommend>
              <label>I recommend this product*</label>
            </FormRecommend>
            <FormRecommendInput>
              <NoRadioButton type="radio" id="yes" name="recommend" value="true" required
              onChange={(e) => handleBool(e)}></NoRadioButton>
              <label htmlFor="yes">
                {rec === 'yes' &&
                  <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>Yes</SelectButton>
                }
                {rec !== 'yes' &&
                  <SelectButton style={{"border": "black solid 2px"}}>Yes</SelectButton>
                }
              </label>
              <NoRadioButton type="radio" id="no" name="recommend" value="false"
              onChange={(e) => handleBool(e)}></NoRadioButton>
              <label htmlFor="no">
                {rec === 'no' &&
                  <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>No</SelectButton>
                }
                {rec !== 'no' &&
                  <SelectButton style={{"border": "black solid 2px"}}>No</SelectButton>
                }
              </label>
            </FormRecommendInput>
          </div>
          <FormCharCont>
            <FormCategory>
              Characteristics*
            </FormCategory>
            {chars.length === 0 && <div>No characteristics at this time</div>}
            <IndCharCont>
              {chars.length >= 1 &&
                chars.map((char, index) => {
                  return (
                    <IndChar key={index}>
                      <div style={{"marginRight": "60px", "width": "250px"}}>
                        <label>
                          {char}:
                          <CharSelected>
                              {charChart[char][currentSelection[char]]}
                          </CharSelected>
                        </label>
                        <div>
                          <NoRadioButton
                            type="radio"
                            value="1"
                            id={`${char}-1`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}
                            required>
                          </NoRadioButton>
                          <label htmlFor={`${char}-1`}>
                            { currentSelection[char] === 1 &&
                              <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>
                                1
                              </SelectButton>
                            }
                            { currentSelection[char] !==1 &&
                              <SelectButton style={{"border": "black solid 2px"}}>1</SelectButton>
                            }
                          </label>
                          <NoRadioButton
                            type="radio"
                            value="2"
                            id={`${char}-2`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </NoRadioButton>
                          <label htmlFor={`${char}-2`}>
                            { currentSelection[char] ===2 &&
                              <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>
                                2
                              </SelectButton>
                            }
                            { currentSelection[char] !==2 &&
                              <SelectButton style={{"border": "black solid 2px"}}>2</SelectButton>
                            }
                          </label>
                          <NoRadioButton
                            type="radio"
                            value="3"
                            id={`${char}-3`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </NoRadioButton>
                          <label htmlFor={`${char}-3`}>
                            { currentSelection[char] ===3 &&
                              <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>
                                3
                              </SelectButton>
                            }
                            { currentSelection[char] !==3 &&
                              <SelectButton style={{"border": "black solid 2px"}}>3</SelectButton>
                            }
                          </label>
                          <NoRadioButton
                            type="radio"
                            value="4"
                            id={`${char}-4`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </NoRadioButton>
                          <label htmlFor={`${char}-4`}>
                            { currentSelection[char] ===4 &&
                              <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>
                                4
                              </SelectButton>
                            }
                            { currentSelection[char] !==4 &&
                              <SelectButton style={{"border": "black solid 2px"}}>4</SelectButton>
                            }
                          </label>
                          <NoRadioButton
                            type="radio"
                            value="5"
                            id={`${char}-5`}
                            onChange={(e) => handleSelect(e, char)}
                            name={charObj[char].id}>
                          </NoRadioButton>
                          <label htmlFor={`${char}-5`}>
                            { currentSelection[char] ===5 &&
                              <SelectButton style={{"border": "#63e463c9 solid 3px", "color": "green"}}>
                                5
                              </SelectButton>
                            }
                            { currentSelection[char] !==5 &&
                              <SelectButton style={{"border": "black solid 2px"}}>5</SelectButton>
                            }
                          </label>
                        </div>
                      </div>
                      <CharDefinition>
                        <span>1: {charChart[char][1]}</span>
                        <span>2: {charChart[char][3]}</span>
                        <span>3: {charChart[char][5]}</span>
                      </CharDefinition>
                    </IndChar>
                  )
                })
              }
            </IndCharCont>
          </FormCharCont>
          <SingleLineInput>
            <FormCategory>
              Review Summary*
            </FormCategory>
            <SingleLineInputSpec type="text" name="summary" placeholder="Best purchase ever!!!" maxLength="60" required></SingleLineInputSpec>
          </SingleLineInput>
          <FormBodyCont>
            <FormCategory>
              Review Body*
            </FormCategory>
            <FormBodyInput>
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
                <span style={{"color": "red"}}>Minimum required characters left: [{50-body.length}]</span>
              }
              { body.length > 50 &&
                <span style={{"color": "gray"}}>Minimum Reached</span>
              }
            </FormBodyInput>
          </FormBodyCont>
          <PhotosCont>
            <FormCategory>
              Upload Photos
            </FormCategory>
            <SingleLineInputSpec
              name="photos"
              id="photos"
              type="input"
              value={image}
              onChange={(e) => {setImage(e.target.value)}}
              placeholder={`You can add ${5 - images.length} more images!`}>
            </SingleLineInputSpec>
            <ButtonsCont>
              {images.length < 6 &&
                <span
                  // style={{"border": "gray solid 3px"}}
                  onClick={(e) => imageHandler(e, 'add')}>
                  Add Image
                </span>
              }
              {images.length > 0 &&
                <PhotoCont>
                  {photosArr}
                </PhotoCont>
              }
            </ButtonsCont>
          </PhotosCont>
          <UserInfo>
            <SingleLineInput>
              <FormCategory>
                Nickname*
              </FormCategory>
              <SingleLineInputSpec type="text" name="name" placeholder="jackson11" maxLength="60" required></SingleLineInputSpec>
            </SingleLineInput>
            <Warning>
              For privacy reasons do not use your real name or email.
            </Warning>
          </UserInfo>
          <UserInfo>
            <SingleLineInput>
              <FormCategory>
                email*
              </FormCategory>
              <SingleLineInputSpec type="email" name="email" placeholder="jackson11@gmail.com" maxLength="60" required></SingleLineInputSpec>
            </SingleLineInput>
            <Warning>
              For authentication reasons, you will not be emailed.
            </Warning>
          </UserInfo>
          <SubmitButton
            type="submit"
            value="Submit">
          </SubmitButton>
        </AddReview>
      </div>
    </div>,
    document.getElementById('pop-up')
  )
}

export default ReviewModal;


const FormHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  padding: 5px;
   & > span > span {
    text-decoration: underline;
   }
`

const AddReview = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75%;
  max-height: 600px;
  overflow: auto;
  margin: 7% 0%;
  padding: 5px;
  width: 70%;
  border-radius: 5px;
    & > div {
      margin-bottom: 20px;
    }
`

const FormRatingCont = styled.div`
  display: flex;
  flex-direction: column;
    & > label {
      font-size: 30px;
    }
`

const StarAndDefCont = styled.div`
  display: flex;
  margin-top: 5px;
`

const StarCont = styled.div`
  margin-right: 60px;
  margin-left: 20px;
  width: 250px
`

const StarDef = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
`

const NoRadioButton = styled.input`
  display: none;
`

const SingleStarContainer = styled.div`
  height: 47.3px;
  width: 40px;
  display: inline-block;
`

const SingleStarFill = styled.div`
  position: relative;
  display: inline-block;
  height: 47.3px;
  background-color: black;
`

const StarImg = styled.img`
  height: 47.3px;
  width: 40px;
`

const FormRecommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
`

const FormRecommendInput = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  font-family: 'Varela Round', sans-serif;
`

const FormCharCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const IndCharCont = styled.div`
  padding-left: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`

const IndChar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 5px;
  font-family: 'Varela Round', sans-serif;
    & > div > label {
      flex-direction: row;
      display: flex;
      align-items: center;
    }
`

const CharSelected = styled.span`
  font-size: 12px;
  margin-left: 5px;
`

const CharDefinition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
`

const FormCategory = styled.label`
  font-size: 30px;
`

const SingleLineInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const SingleLineInputSpec = styled.input`
  width: 90%;
  padding: 1px 10px;
  margin: 1px auto;
  font-family: 'Varela Round', sans-serif;
  padding: 10px;
  margin: 5px auto 1px auto;
`

const Warning = styled.div`
  font-size: 10px;
  font-family: 'Varela Round', sans-serif;
  color: red;
  text-align: left;
  width: 90%;
  padding: 1px 10px;
  margin: 1px auto;
`

const FormBodyCont = styled.div`
  display: flex;
  flex-direction: column;
`

const FormBodyInput = styled.div`
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  font-family: 'Varela Round', sans-serif;
    & > textarea {
      width: 90%;
      height: 100px;
      margin: 1px auto;
      font-family: 'Varela Round', sans-serif;
      padding: 10px;
      margin: 5px auto 1px auto;
    }
    & > span {
      text-align: right;
      font-size: 10px;
      width: 90%;
      margin: 1px auto;
    }
`

const PhotosCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ButtonsCont = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  font-family: 'Varela Round', sans-serif;
    & > span {
      border-radius: 5px;
      border: gray solid 3px;
      padding: 3px;
      font-size: 14px;
      margin: 5px 5px;
      background-color: buttonface;
      cursor: default;
    }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SubmitButton = styled.input`
  margin: 0px auto;
  display: flex;
  justify-content: space-around;
  width: 35%;
  font-family: 'Varela Round', sans-serif;
  border: gray solid 3px;
  border-radius: 5px;
`

const PhotoCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
   & div {
    margin-rigth: 3px;
   }
`

const Athumbnails = styled.img`
  border: solid rgb(229, 229, 229) .5px;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
  border-radius: 5px;
  border: #63e463c9 solid 3px;
`;

const AllowPhotoDelete = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  margin: 4px;
   & > span {
    position: absolute;
    top: 3.5px;
    right: 3px;
    background-color: white;
    border: red solid 1px;
    border-radius: 50%;
    height: 12px;
    width: 12px;
    color: red;
    font-size: 10px;
    text-align: center;
    cursor: pointer;
   }
`

const SelectButton = styled.span`
  display: inline-block;
  border: black solid 2px;
  margin: 5px;
  padding: 1px 3px;
  border-radius: 5px;
  width: 28px;
  text-align: center;
    &:hover {
      background-color: #c3f0cb;
    }
`