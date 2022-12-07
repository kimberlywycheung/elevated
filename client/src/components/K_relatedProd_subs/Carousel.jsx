import React, { useState } from 'react';
import Card from './Card.jsx';

const Carousel = function ({ type, currentState, currentProd, addToFavorites, deleteFromFavorites, setProduct }) {
  const [showLeftButton, setShowLeft] = useState(false);
  const [showRightButton, setShowRight] = useState(true);

  // dynamic title to be used in html header for the carousel
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';
  const carouselId = `carousel-${type}`;

  const addOutfit = () => {
    if (type === 'outfits') {
      addToFavorites(currentProd.id);
    }
  };

  // carousel scrolling functions
  const updateScroll = () => {
    const carouselElement = document.getElementById(carouselId);

    if (carouselElement) {
      const { scrollLeft, scrollWidth, offsetWidth } = document.getElementById(carouselId);

      if (scrollLeft === 0) setShowLeft(false);
      if (scrollLeft > 0) setShowLeft(true);
      if (scrollLeft + offsetWidth === scrollWidth) setShowRight(false);
      if (scrollLeft < (scrollWidth - offsetWidth)) setShowRight(true);
    }
  };

  const scrollLeft = () => {
    document.getElementById(carouselId).scrollLeft -= 200;
    updateScroll();
  };

  const scrollRight = () => {
    document.getElementById(carouselId).scrollLeft += 200;
    updateScroll();
  };

  return (
    <div>
      <h2 id={type}>{title}</h2>

      <div className="carousel-container" id="flex-box">

        {showLeftButton &&
          <button className="scroll_buttons" id="scroll-left" onClick={scrollLeft}>
            <img src="../../client/dist/images/left-scroll.png" width="20"/>
          </button>}

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

        {showRightButton &&
        <button className="scroll_buttons" value="scroll-right" onClick={scrollRight}>
          <img src="../../client/dist/images/right-scroll.png" width="20"/>
        </button> }

      </div>
    </div>
  );
};

export default Carousel;
