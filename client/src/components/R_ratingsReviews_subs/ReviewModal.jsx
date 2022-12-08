import React from 'react';
import ReactDOM from 'react-dom';

const ReviewModal = function ReviewModal({ isOpen, name, id, setIsOpen, charBreak }) {
  if (!isOpen) return null

  const chars = Object.keys(charBreak.characteristics)
  console.log('CharBreak ', charBreak)

  return ReactDOM.createPortal(
    <div className='qa-modal modal-bg'>
      <span onClick={(e) => {e.preventDefault(); setIsOpen(false)}} id='pop-up-exit'>X</span>
      <div className='modal-content scroll'>
        <h3>Write your review</h3>
        <h4>About the {name}</h4>
        <form>
          <div>
            <label>* Overall Rating:</label>
            <div>
              <input type="radio" name="starRating"></input>
              <label>1</label>
              <input type="radio" name="starRating"></input>
              <label>2</label>
              <input type="radio" name="starRating"></input>
              <label>3</label>
              <input type="radio" name="starRating"></input>
              <label>4</label>
              <input type="radio" name="starRating"></input>
              <label>5</label>
            </div>
            <div>
              <span>5: Great</span>
              <span>4: Good</span>
              <span>3: Average</span>
              <span>2: Fair</span>
              <span>1: Poor</span>
            </div>
          </div>
          <div>
            <div>
              <label>* Do you recommend this product?</label>
            </div>
            <div>
              <input type="radio" id="yes" name="recommend" value="yes"></input>
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="recommend" value="no"></input>
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div>
            <div>* Characteristics:</div>
            {chars.length === 0 && <div>No characteristics at this time</div>}
            {chars.length >= 1 &&
              chars.map((char, index) => {
                return (
                  <div key={index}>
                    <label>{char}</label>
                    <div>
                      <input type="radio" name="charRating"></input>
                      <label>1</label>
                      <input type="radio" name="charRating"></input>
                      <label>2</label>
                      <input type="radio" name="charRating"></input>
                      <label>3</label>
                      <input type="radio" name="charRating"></input>
                      <label>4</label>
                      <input type="radio" name="charRating"></input>
                      <label>5</label>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div>
            <label>* Review Summary:</label>
            <input type="text" placeholder="Best purchase ever!!!" maxLength="60"></input>
          </div>
          <div>
            <label>* Review Body:</label>
            <textarea
              minLength="50"
              maxLength="1000"
              placeholder="Why did you like the product or not?">
            </textarea>
          </div>
          <div>
            <label>Upload Photos</label>
            <input type="image"></input>
          </div>
          <div>
            <label>* Nickname:</label>
            <input type="text" placeholder="jackson11" maxLength="60"></input>
            <div>For privacy reasons do not use your real name or email.</div>
          </div>
          <div>
            <label>* Review Summary:</label>
            <input type="email" placeholder="jackson11@gmail.com" maxLength="60"></input>
            <div>For authentication reasons, you will not be emailed.</div>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>,
    document.getElementById('pop-up')

  )
}

export default ReviewModal;
