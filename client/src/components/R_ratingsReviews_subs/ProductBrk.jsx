import React from 'react';
import styled from 'styled-components';

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
        <CharContainer>
          <div style={{"width": `${indicator/5*100}%`}}>
            <span>▼</span>
          </div>
        </CharContainer>
        <CharBarContainer>
          <div>
            <CharBar></CharBar>
            <span>{charChart[char][0]}</span>
          </div>
          <div>
            <CharBar></CharBar>
            <span>{charChart[char][2]}</span>
          </div>
          <div>
            <CharBar></CharBar>
            <span>{charChart[char][4]}</span>
          </div>
        </CharBarContainer>
      </div>
      <hr></hr>
    </div>
  )
}

export default ProductBrk;

const CharContainer = styled.div`
  height: 5px;
  width: 99%;
  position: relative;
  z-index: 1;
    & > div {
      height: 100%;
      text-align: right;
      & > span {
        font-size: 10px;
      }
    }
`
const CharBarContainer = styled.div`
  width: 99%;
  display: flex;
  flex-direction: row;
    & > div {
      color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33%;
    }
`

const CharBar = styled.div`
  height: 5px;
  width: 95%;
  background-color: gray;
  border-radius: 5px;
  margin: 5px 5px 2px 5px;
    & + span {
      font-size: 10px;
    }
`