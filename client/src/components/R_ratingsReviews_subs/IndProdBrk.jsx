import React from 'react';

const IndProdBrk = function IndProdBrk({ char, breakdown }) {

  return (
    <div>
      <span>{char}</span>
      <div>{Math.round(breakdown[char].value * 10)/10} -   -   -</div>
      <div>
        <span>poor </span>
        <span> perfect</span>
      </div>
    </div>
  )
}

export default IndProdBrk;