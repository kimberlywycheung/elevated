import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const QaModal = ({style, productID, formType, setModalStyle}) => {
  console.log('modal reached with prodID', productID)
  var inputFields = [];
  if(formType === 'addQ') {
    inputFields = [
      <input type='text' name='body' placeholder='question body..'></input>,
      <input type='text' name='username' placeholder='name for username'></input>,
      <input type='email' name='email' placeholder='myemail@email.com'></input>
    ]
  } else {
    inputFields = [
      <input type='text' name='body' placeholder='question body..'></input>,
      <input type='text' name='username' placeholder='name for username'></input>,
      <input type='email' name='email' placeholder='myemail@email.com'></input>,
      <input type='text' name='photos' placeholder='PHOTO UPLOADS'></input>
    ]
  }

  return ReactDOM.createPortal(
    <div style={style} className='qa-modal modal-bg'>
      <div className='modal-content'>
        QA Modal
        <form onSubmit={e => {e.preventDefault();setModalStyle({display: 'none'}); console.log('qa modal submit')}}>
          {inputFields}
          <button type='submit'>Submit {formType === 'addQ' ? 'Question' : 'Answer'}</button>
        </form>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default QaModal;