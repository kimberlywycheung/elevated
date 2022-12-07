import React from 'react';

const Characteristic = function ({ feature, items }) {
  const relatedChar = items[0];
  const currentChar = items[1];

  return (
    <div>
      {relatedChar &&
        <div id="flex-box">
          {relatedChar === relatedChar?
            <p id='left'>✔️</p> : <p id='left'></p>}
          <p id='center'>{relatedChar}</p>
          {currentChar === relatedChar ?
            <p id='right'>✔️</p> : <p id='right'></p>}
        </div>
      }
      {currentChar && relatedChar !== currentChar &&
        <div id="flex-box">
        {relatedChar === currentChar ?
          <p id='left'>✔️</p> : <p id='left'></p>}
        <p id='center'>{currentChar}</p>
        {currentChar === currentChar ?
          <p id='right'>✔️</p> : <p id='right'></p>}
      </div>
      }
    </div>
  );
}

export default Characteristic;
