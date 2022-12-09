import React from 'react';

const Characteristic = function ({ relatedChar,  currentChar}) {
  return (
    <div>
      {relatedChar &&
        <div id="flex-box">
          <p id="left checkmark">
            <i class="fa-solid fa-check"></i>
          </p>
          <p id="center" flex-glow="4">{relatedChar}</p>
          {currentChar === relatedChar ?
            <p id="right checkmark">
              <i class="fa-solid fa-check"></i>
            </p> : <p id="right"></p>}
        </div> }
      {currentChar && (relatedChar !== currentChar) &&
        <div className="compare-characteristics" id="flex-box">
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
