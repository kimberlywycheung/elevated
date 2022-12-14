import React, { useState } from 'react';
import ReviewModal from './ReviewModal.jsx'
import styled from 'styled-components';

const AddReviews =function AddReviews({ name, id, charBreak, setRList }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span>
      <button onClick={() => setIsOpen(true)}>Add Review</button>
      <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id} charBreak={charBreak} setRList={setRList}/>
    </span>
  )
}

export default AddReviews;