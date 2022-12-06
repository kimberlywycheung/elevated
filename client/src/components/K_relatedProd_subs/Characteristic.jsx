import React from 'react';

const Characteristic = function ({ feature, items }) {
  const relatedChar = items[0];
  const currentChar = items[1];

  return (
    <div>
      {relatedChar &&
        <div id="flex-box">
          {relatedChar === relatedChar &&
            <p id='inline'>yes</p>}
          <p id='inline'>{relatedChar}</p>
          {currentChar === relatedChar &&
            <p id='inline'>yes</p>}
        </div>
      }
      {currentChar && relatedChar !== currentChar &&
        <div id="flex-box">
        {relatedChar === currentChar &&
          <p id='inline'>yes</p>}
        <p id='inline'>{currentChar}</p>
        {currentChar === currentChar &&
          <p id='inline'>yes</p>}
      </div>
      }
    </div>
  );
}

export default Characteristic;
