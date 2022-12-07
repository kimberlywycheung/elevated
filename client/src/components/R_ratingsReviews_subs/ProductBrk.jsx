import React from 'react';

const ProductBrk = function ({ char, breakdown }) {
  let indicator = Math.round(breakdown[char].value * 10)/10

  return (
    <div>
      <span>{char}</span>
      <div>
        <div className="charContainerStyles">
          <div className="charFillerStyles" style={{"width": indicator/5*120}}>
            <span>▼</span>
          </div>
        </div>
        <div className="charBarContainer">
          <div className="charBarStyles"></div>
          <div className="charBarStyles"></div>
          <div className="charBarStyles"></div>
        </div>
        <div className="charWordContainer">
          <span style={{"fontSize": "10px"}}>poor</span>
          <span style={{"fontSize": "10px"}}>amazing</span>
        </div>
      </div>
    </div>
  )
}

export default ProductBrk;