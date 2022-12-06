import React from 'react';

const Characteristic = function ({ feature, items }) {
  return (
    <div>
      <div id="flex-box">
        {items[0] === items[0] &&
          <p id='inline'>yes</p>}
        <p id='inline'>{items[0]}</p>
        {items[1] === items[0] &&
          <p id='inline'>yes</p>}
      </div>
      <div id="flex-box">
        {items[0] === items[1] &&
          <p id='inline'>yes</p>}
        <p id='inline'>{items[1]}</p>
        {items[1] === items[1] &&
          <p id='inline'>yes</p>}
      </div>
    </div>
  );
}

export default Characteristic;
