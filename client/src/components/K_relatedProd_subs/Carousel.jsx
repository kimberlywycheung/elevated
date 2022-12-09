import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const Carousel = React.forwardRef(({ type, currentState, currentProd, addToFavorites, deleteFromFavorites, setProduct }, ref ) => {
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
      let { scrollLeft, scrollWidth, offsetWidth } = carouselElement;

      // console.log('scrollLeft: ', scrollLeft);
      // console.log('scrollWidth: ', scrollWidth);
      // console.log('offsetWidth: ', offsetWidth);

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

  if (currentState || type === "outfits") {
    return (
      <div>
        <h2 id={type}>{title}</h2>
{/*
        {showLeftButton &&
            <button className="scroll_buttons" id="scroll-left" onClick={scrollLeft}>
              <i class="fa-solid fa-angle-left"></i>
            </button>} */}

        <div className="carousel-container" id="flex-box">

          {showLeftButton ?
            <button className="scroll_buttons" id="scroll-left" onClick={scrollLeft}>
              <i class="fa-solid fa-angle-left"></i>
            </button> : <span className="scroll_buttons"></span>}

          <div className="carousel" id={carouselId}>
            {type === 'outfits' &&
              <div className="card" >
                <button id="center add-to-outfit" onClick={addOutfit}>
                  <p>
                    +
                    <br/>
                    Add to Outfit
                  </p>
                </button>
              </div> }

          {currentState.length > 0 &&
            currentState.map((item) => {
              return <Card key={item} type={type} item={item} currentProd={currentProd} deleteFromFavorites={deleteFromFavorites} setProduct={setProduct} ref={ref}/>
            })}
          </div>

          {showRightButton ?
          <button className="scroll_buttons" value="scroll-right" onClick={scrollRight}>
            <i class="fa-solid fa-angle-right"></i>
          </button> : <span className="scroll_buttons"></span>}

        </div>

        {/* {showRightButton &&
          <button className="scroll_buttons" value="scroll-right" onClick={scrollRight}>
            <i class="fa-solid fa-angle-right"></i>
          </button>} */}

      </div>
    );
  }
});

export default Carousel;
