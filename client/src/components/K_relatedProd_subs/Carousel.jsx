import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card, { CardDiv } from './Card.jsx';

const Carousel = React.forwardRef(({ type, currentState, currentProd, addToFavorites, deleteFromFavorites, setProduct }, ref) => {
  const [showLeftButton, setShowLeft] = useState(false);
  const [showRightButton, setShowRight] = useState(true);

  // dynamic title to be used in html header for the carousel
  const title = type === 'outfits' ? 'Your Outfit' : 'Related Products';
  const carouselId = `carousel-${type}`;

  useEffect(() => {
    // determines initial scroll state
    if (currentState) {
      const initialScrollWidth = (currentState.length * 260) + (type === 'outfits' ? 220 : 0);
      const carouselWidth = ((window.innerWidth - 122) * 0.95);
      const initialOffsetWidth = initialScrollWidth < carouselWidth ? 0 : initialScrollWidth - carouselWidth;

      const initialWidths = {
        scrollLeft: 0,
        scrollWidth: initialScrollWidth,
        offsetWidth: initialOffsetWidth
      };

      setScroll(initialWidths);
    }
  }, [currentState]);

  // adds current viewed product to favorites/my outfit
  const addOutfit = () => {
    if (type === 'outfits') {
      addToFavorites(currentProd.id);
    }
  };

  // carousel scrolling functions
  const updateScroll = () => {
    const carouselElement = document.getElementById(carouselId);

    if (carouselElement) {
      setScroll(carouselElement);
    }
  };

  const setScroll = (carouselElement) => {
    const { scrollLeft, scrollWidth, offsetWidth } = carouselElement;

    if (scrollWidth > ((window.innerWidth - 122) * .95)) {
      // set left states
      if (scrollLeft === 0) {
        setShowLeft(false);
      }
      if (scrollLeft > 0) {
        setShowLeft(true);
      }
      // set right states
      if (scrollLeft + offsetWidth === scrollWidth) {
        setShowRight(false);
      }
      if (scrollLeft + offsetWidth < scrollWidth) {
        setShowRight(true);
      }
    } else {
      setShowLeft(false);
      setShowRight(false);
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

  if (currentState || type === 'outfits') {
    return (
      <div>
        <CarouselHeader id={type}>{title}</CarouselHeader>

        <CarouselContainer>

            {showLeftButton ?
            <ScrollButton id="scroll-left" onClick={scrollLeft}>
              <ScrollIcon><i className="fa-solid fa-angle-left"></i></ScrollIcon>
            </ScrollButton> : <ScrollButton/>}

          <CarouselDiv id={carouselId}>

            {type === 'outfits' &&
              <CardDiv>
                <AddToOutfitCard>
                  <AddToOutfitButton onClick={addOutfit}>+<br/>Add to Outfit</AddToOutfitButton>
                </AddToOutfitCard>
              </CardDiv> }

            {currentState && currentState.length > 0 &&
              currentState.map((item) => {
                return <Card key={item} type={type} item={item} currentProd={currentProd}
                  deleteFromFavorites={deleteFromFavorites} setProduct={setProduct} ref={ref}/>
              })}

          </CarouselDiv>

          {showRightButton ?
            <ScrollButton value="scroll-right" onClick={scrollRight}>
              <ScrollIcon><i className="fa-solid fa-angle-right"></i></ScrollIcon>
            </ScrollButton> : <ScrollButton/>}

        </CarouselContainer>
      </div>
    );
  }
});

// STYLING
const CarouselHeader = styled.h2`
  padding-left: 22px;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ScrollButton = styled.div`
  border-width: 0px;
  width: 10px;
  margin: 8px;
  padding: 0px;
  font-size: 1em;
  background-color: transparent;
`;

const ScrollIcon = styled.div`
  position: relative;
  top: 50%;
`;

const CarouselDiv = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  height: 350px;
  width: 95% auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddToOutfitCard = styled.div`
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 0px;
  bottom: 0;
  width: 100%;
  height: 75%;
  max-height: 250px;
  min-height: 180px;
  background-color: rgb(211,211,211);
  border-radius: 5px;
  &:hover {
    opacity: 80%;
  }
`;

const AddToOutfitButton = styled.button`
  vertical-align: middle;
  text-align: center;
  background-color: transparent;
  border: 0px;
  position: relative;
  top: 25%;
  left: 9%;
`;

export default Carousel;
