import React from 'react';
import Card from './Card.jsx';

const Carousel = function ({ type, currentState, currentProd, addToFavorites, deleteFromFavorites, setProduct }) {
  //dynamic title to be used in html header for the carousel
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';
  const carouselId = `carousel-${type}`;

  const addOutfit = () => {
    if (type === 'outfits') {
      addToFavorites(currentProd.id);
    }
  };

  const scrollLeft = () => {
    console.log('scrolling left');
    document.getElementById(carouselId).scrollLeft -= 200;
  };

  const scrollRight = () => {
    console.log('scrolling right');
    document.getElementById(carouselId).scrollLeft += 200;
  };

  return (
    <div>
      <h2 id={type}>{title}</h2>

      <div className="carousel-container" id="flex-box">

        {/* {document.getElementById(carouselId).scrollLeft > 0 &&
          <button className="scroll_buttons" id="scroll-left" onClick={scrollLeft}>⬅️</button>} */}
        <button className="scroll_buttons" id="scroll-left" onClick={scrollLeft}>⬅️</button>

        <div className="carousel" id={carouselId}>
          {type === 'outfits' &&
            <div className="card">
              <button id="center" onClick={addOutfit}>
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

        {/* {document.getElementById(carouselId).scrollLeft < document.getElementById(carouselId).scrollWidth &&
        <button className="scroll_buttons" value="scroll-right" onClick={scrollRight}>➡️</button> } */}
        <button className="scroll_buttons" value="scroll-right" onClick={scrollRight}>➡️</button>
      </div>
    </div>
  );
};

export default Carousel;
