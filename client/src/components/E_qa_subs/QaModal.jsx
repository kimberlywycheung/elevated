import React from 'react';
import axios from 'axios';

const QaModal = () => {


  return (
    <div className='qa-modal'>
      QA Modal
      <form onSubmit={e => {e.preventDefault(); console.log('qa modal submit')}}>


        <button type='submit'>qa modal submit BUTTON</button>
      </form>
    </div>

  )

};

export default QaModal;