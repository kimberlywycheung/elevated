import React from 'react';
import Card from './Card.jsx';

const Carousel = function ({ type, currentState, currentProd, addToFavorites, deleteFromFavorites, setProduct }) {
  //dynamic title to be used in html header for the carousel
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';

  const clickHandler = () => {
    if (type === 'outfits') {
      addToFavorites(currentProd.id);
    }
  };

  return (
    <div className="carousel">
      <p id={type}>{title}</p>
      {type === 'outfits' &&
        <div className="card">
          <button onClick={clickHandler}>
            <p>+<br/>Add to Outfit</p>
          </button>
        </div> }
      {currentState.length > 0 &&
        currentState.map((item) => {
          return <Card key={item} type={type} item={item} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites} setProduct={setProduct}/>
        })}
    </div>
  );
};

export default Carousel;
