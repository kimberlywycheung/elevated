import React, { useState } from 'react';
import ReviewModal from './ReviewModal.jsx'

const AddReviews =function AddReviews({ name, id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span>
      <button onClick={() => setIsOpen(true)}>Add Review</button>
      <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id}/>
    </span>
  )
}

export default AddReviews;