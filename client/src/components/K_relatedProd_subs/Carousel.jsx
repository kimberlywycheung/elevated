import React from 'react';
import Comparison from './Comparison.jsx';
import Card from './Card.jsx';

const Carousel = ({ type, currentState, currentProd }) => {

  // console.log('type: ', type);
  // console.log('currentState: ', currentState);

  const emptyOutfit = currentState.length === 0 ? true : false;
  const showAdd = type === 'outfits'? true : false;
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';

  const cards = () => {
    if (currentState.length > 0) {
      currentState.map((item) => {
        return <Card key={item} item={item}/>
      })
    }
  }

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