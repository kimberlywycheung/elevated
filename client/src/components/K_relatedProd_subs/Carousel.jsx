import React from 'react';
import Comparison from './Comparison.jsx';
import Card from './Card.jsx';

const Carousel = ({ type, currentState, currentProd }) => {
  // convert localstorage string to array
  if (typeof(currentState) === 'string') {
    currentState = currentState.replace(/\r?\n|\r/g, '').split(',');
  }

  // remove any duplicates from currentState
  let stateSet = [...new Set(currentState)];
  currentState = Array(stateSet);

  const showAdd = type === 'outfits'? true : false;
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';

  return (
    <div>
      <p id={type}>{title}</p>
      {showAdd &&
        <div> <p>Add to Outfit</p> </div> // add className = card?
      }
      {currentState.length > 0 &&
        currentState.map((item) => {
          return <Card key={item} item={item}/>
        })
      }
    </div>
  )
}

export default Carousel;