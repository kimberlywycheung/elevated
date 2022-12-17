import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from "styled-components";

  //STYLED COMPONENTS
  const ModalHeader = styled.h2`
    font-family: 'Varela Round', sans-serif;
    text-align: center;
  `;

  const EvansForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    font-family: 'Varela Round', sans-serif;
    width: 50%;
    padding: 10px;
    margin: 10px auto;
    }
    & > textarea {
      resize:none;
    }
`;
  //END of styled components

const QaModal = ({style, productID, formType, setModalStyle, qID, getQlist}) => {
  var type = formType === 'addQ' ? 'Question' : 'Answer';
  var addOnKey = formType === 'addQ' ? ['1','2','3','0'] : ['4','5','6','9'];
  var inputFields = [
    <input type='text' name='body' key={productID + addOnKey[0]} placeholder={`${type} body`} required={true}></input>,
    <input type='text' name='name' key={productID + addOnKey[1]} placeholder='name for username'></input>,
    <input type='email' name='email' key={productID + addOnKey[2]} placeholder='myemail@email.com'></input>
  ];
  if(formType === 'addA') {
    inputFields.push(<div key={5768} className='label1'>Separate images by Comma-space</div>);
    inputFields.push(<textarea rows={4} name='photos' key={productID + addOnKey[3]} placeholder='url of photos, new line per photo'></textarea>)
  }


  const sendData = () => {
    const auth = {'Authorization': process.env.GITHUB_TOKEN};

      var form = document.getElementById(formType);
      const formData = new FormData(form);
      const dataObj = {};
      for (const [key, value] of formData) {
        Object.assign(dataObj, {[key]: value})
      }
    if(formType === 'addQ') { //doesn't work yet..
      Object.assign(dataObj, {product_id: productID});
      console.log('dataObj SEND QDATA', dataObj);
      //post Question from form
      const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions';
      axios({method: 'post', url: url, headers: auth, data: dataObj})
      .then((res) => {
        console.log('res Qdata POST response', res);
        getQlist();
      })
      .catch(err => {
        alert(`Error Posting Question\n\n` + err.response.data);
        console.error(err);
      })
    } else {
      var photosArr = dataObj.photos.split(', ');
      if(photosArr.length === 1 && photosArr[0] == '') {
        photosArr = [];
      }
      Object.assign(dataObj, {question_id: qID, photos: photosArr});
      console.log('dataObj SEND ADATA', dataObj); //got em!
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${qID}/answers`;
      //post answer from form
      axios({method: 'post', url: url, headers: auth, data: dataObj})
      .then((res) => {
        console.log('res Adata POST response', res);
        getQlist();
      })
      .catch(err => {
        console.error('ERROR', err);
        alert('Didn\'t Post Answer properly\n\n' + err.response.data);
      })
    }
  }; //end SEND DATA



  return ReactDOM.createPortal(
    <div onClick={e => {e.stopPropagation(); console.log('modal clicked')}} style={style} className='qa-modal modal-bg'>
      <span onClick={e => {e.preventDefault(); setModalStyle({display:'none'})}} id='pop-up-exit'>X</span>
      <div className='modal-content'>
        <ModalHeader>Add {type}</ModalHeader>
        <EvansForm id={formType} onSubmit={e => {e.preventDefault(); sendData(); setModalStyle({display: 'none'});}}>
          {inputFields}
          <button type='submit'>Submit {type}</button>
        </EvansForm>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default QaModal;