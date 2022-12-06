import React from 'react';
import ReactDOM from 'react-dom';

const ReviewModal = function ReviewModal({ isOpen, name, id }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className='qa-modal modal-bg'>
      <div className='modal-content'>
        <h3>Write your review</h3>
        <h4>About the {name}</h4>
      </div>
    </div>,
    document.getElementById('pop-up')

  )
}

export default ReviewModal;
