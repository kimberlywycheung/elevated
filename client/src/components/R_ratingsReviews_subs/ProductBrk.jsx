import React from 'react';

const ProductBrk = function ({ char, breakdown }) {
  let indicator = Math.round(breakdown[char].value * 10)/10

  const charChart = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly Narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Poor', 'Slightyly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'Ok', 'Pretty Great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose']
  }

  return (
    <div>
      <span>{char}</span>
      <div>
        <div className="charContainerStyles">
          <div className="charFillerStyles" style={{"width": `${indicator/5*100}%`}}>
            <span>▼</span>
          </div>
        </div>
        <div className="charBarContainer">
          <div>
            <div className="charBarStyles"></div>
            <span style={{"fontSize": "10px"}}>{charChart[char][0]}</span>
          </div>
          <div>
            <div className="charBarStyles"></div>
            <span style={{"fontSize": "10px"}}>{charChart[char][2]}</span>
          </div>
          <div>
            <div className="charBarStyles"></div>
            <span style={{"fontSize": "10px"}}>{charChart[char][4]}</span>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default ProductBrk;