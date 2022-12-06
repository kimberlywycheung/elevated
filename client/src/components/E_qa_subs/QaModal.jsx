import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const QaModal = ({style, productID, formType, setModalStyle, qID, getQlist}) => {
  var type = formType === 'addQ' ? 'Question' : 'Answer';
  var addOnKey = formType === 'addQ' ? ['1','2','3','0'] : ['4','5','6','9'];
  var inputFields = [
    <input type='text' name='body' key={productID + addOnKey[0]} placeholder={`${type} body`}></input>,
    <input type='text' name='name' key={productID + addOnKey[1]} placeholder='name for username'></input>,
    <input type='email' name='email' key={productID + addOnKey[2]} placeholder='myemail@email.com'></input>
  ];
  if(formType === 'addA') {
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
    } else { //SEND ANSWER WORKS!
      Object.assign(dataObj, {question_id: qID, photos: []});
      console.log('dataObj SEND ADATA', dataObj); //got em!
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${qID}/answers`;
      //post answer from form
      axios({method: 'post', url: url, headers: auth, data: dataObj})
      .then((res) => {
        console.log('res Adata POST response', res);
        getQlist();
      })
    }
  };

  return ReactDOM.createPortal(
    <div onClick={e => {e.stopPropagation(); console.log('modal clicked')}} style={style} className='qa-modal modal-bg'>
      <div className='modal-content'>
        <span id='qa-model-text'>Add {type}</span>
        <form id={formType} onSubmit={e => {e.preventDefault(); sendData(); setModalStyle({display: 'none'});}}>
          {inputFields}
          <button type='submit'>Submit {type}</button>
        </form>
      </div>

    </div>,
    document.getElementById('pop-up')

  )

};

export default QaModal;