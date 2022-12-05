import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const QaModal = ({style, productID, formType, setModalStyle, qID}) => {
  var inputFields = [
    <input type='text' name='body' key={productID + '1'} placeholder='question body..'></input>,
    <input type='text' name='name' key={productID + '2'} placeholder='name for username'></input>,
    <input type='email' name='email' key={productID + '3'} placeholder='myemail@email.com'></input>
  ];
  if(formType === 'addA') {
    inputFields.push(<input type='text' name='photos' key={productID + '4'} placeholder='PHOTO UPLOADS'></input>)
  }

  const sendData = () => {
    console.log('sending Data for ', formType);

      var form = document.getElementById(formType);
      const formData = new FormData(form);
      console.log('FORM DATA-> \n');
      const dataObj = {};
      for (const [key, value] of formData) {
        console.log(`${key}: ${value}\n`);
        Object.assign(dataObj, {[key]: value})
      }
      console.log('Data Obj after for-of loop\n', dataObj);
    if(formType === 'addQ') {
      Object.assign(dataObj, {product_id: productID});
      console.log('dataObj SEND QDATA', dataObj); //got em!
      //post Question from form
      // axios.post(url, dataObj)
      // .then((res) => {
      //   console.log('res Qdata POST response', res)
      // })
    } else {
      Object.assign(dataObj, {question_id: qID});
      console.log('dataObj SEND ADATA', dataObj); //got em!
      const url = ``;
      //post answer from form
      // axios.post(url, dataObj)
      // .then((res) => {
      //   console.log('res Adata POST response', res)
      // })
    }
  };

  return ReactDOM.createPortal(
    <div style={style} className='qa-modal modal-bg'>
      <div className='modal-content'>
        QA Modal
        <form id={formType} onSubmit={e => {e.preventDefault(); sendData(); setModalStyle({display: 'none'});}}>
          {inputFields}
          <button type='submit'>Submit {formType === 'addQ' ? 'Question' : 'Answer'}</button>
        </form>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default QaModal;