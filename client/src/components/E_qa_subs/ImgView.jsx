import React from 'react';
import ReactDOM from 'react-dom';

const ImgView = ({style, url, setStyle}) => {

  return ReactDOM.createPortal(
    <div style={style} className='modal-bg'>
      <div>
      <span onClick={e => {e.preventDefault(); setStyle({display:'none'})}} id='pop-up-exit'>X</span>
        <img id='img-view' src={url}></img>
      </div>

    </div>,
    document.getElementById('pop-up')
  )
};

export default ImgView;