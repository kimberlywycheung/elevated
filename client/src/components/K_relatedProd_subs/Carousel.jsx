import React from 'react';
import Comparison from './Comparison.jsx';
import Card from './Card.jsx';

const Carousel = ({ type, currentState }) => {
  // types: 'related', 'outfit'
  // for outfits, save to local storage

  const title = type === 'related' ? 'Related Products' : 'Your Outfit'

  return (
    <div>
      <p id={type}>{title}</p>
      {/* {
        currentState.map((item) => {
          return <Card key={item} item={item}/>
        })
      } */}
    </div>
  )
}

export default Carousel;