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
    <div>
      <h2 id={type}>{title}</h2>

      <div className="carousel" id="flex-box">
        {type === 'outfits' &&
          <div className="card">
            <button onClick={clickHandler}>
              <p>
                +
                <br/>
                Add to Outfit
              </p>
            </button>
          </div> }

      {currentState.length > 0 &&
        currentState.map((item) => {
          return <Card key={item} type={type} item={item} currentProd={currentProd} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites} setProduct={setProduct}/>
        })}

      </div>
    </div>
  );
};

export default Carousel;
