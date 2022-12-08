import React from 'react';

const Characteristic = function ({ items }) {
  const relatedChar = items[0];
  const currentChar = items[1];

  return (
    <div>
      {relatedChar &&
        <div id="flex-box">
          <p id="left checkmark">
            <i class="fa-solid fa-check"></i>
          </p>
          <p id="center">{relatedChar}</p>
          {currentChar === relatedChar ?
            <p id="right checkmark">
              <i class="fa-solid fa-check"></i>
            </p> : <p id="right"></p>}
        </div> }
      {currentChar && (relatedChar !== currentChar) &&
        <div id="flex-box">
          {relatedChar === currentChar ?
            <p id="left checkmark">
              <i class="fa-solid fa-check"></i>
            </p> : <p id="left"></p>}
          <p id="center">{currentChar}</p>
          <p id="right checkmark">
            <i class="fa-solid fa-check"></i>
          </p>
        </div> }
    </div>
  );
};

export default Characteristic;
