import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comparison from './Comparison.jsx';
import StarComponent from '../StarComponent.jsx';

const Card = React.forwardRef(({ type, currentProd, item, deleteFromFavorites, setProduct }, ref ) => {
  const [itemInfo, setItemInfo] = useState(null);
  const [itemStyles, setItemStyles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProduct = (endpoint, cb) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${endpoint}`, {
      headers: { Authorization: process.env.GITHUB_TOKEN },
    })
      .then(({ data }) => cb(data))
      .catch((err) => console.log(err));
  };

  const getProductStyles = (endpoint, cb) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${endpoint}/styles`, {
      headers: { Authorization: process.env.GITHUB_TOKEN },
    })
      .then(({ data }) => cb(data.results))
      .catch((err) => console.log(err));
  };

  // inititlizing states for info and styles based on prod id
  useEffect(() => {
    if (item) {
      getProduct(item, setItemInfo);
      getProductStyles(item, setItemStyles);
    }
  }, [item]);

  // inititlizing default img url to be used later
  let defaultImg = '';
  let originalPrice = null;
  let salePrice = null;

  // helper function for grabbing the image and price to be shown in product card
  const updateImagePrice = (style) => {
    defaultImg = style.photos[0].thumbnail_url;
    originalPrice = JSON.stringify(style.original_price).replaceAll('"', '');

    salePrice = style.sale_price;
    if (salePrice) {
      salePrice = JSON.stringify(style.sale_price).replaceAll('"', '');
    }
  };

  if (itemStyles) {
    itemStyles.forEach((style) => {
      if (style['default?']) {
        updateImagePrice(style);
      }
    });
    // corner case: grabs the first style if there are no default styles defined
    if (!originalPrice) {
      updateImagePrice(itemStyles[0]);
    }
  }

  // handler for the favorite/delete button
  const buttonHandler = (e) => {
    e.stopPropagation();
    if (type === 'related') {
      setIsModalOpen(true);
    } else {
      deleteFromFavorites(itemInfo.id);
    }
  };

  // handler for changing current product page to product user has clicked
  const changeCards = (e) => {
    e.stopPropagation();
    if (itemInfo) {
      getProduct(itemInfo.id, (data) => {
        if (itemInfo.id !== currentProd.id) {
          setProduct(data);
        }
      });
      ref.current?.scrollIntoView({behavior: 'smooth'});
    }
  };

  // handler for closing the comparison modal
  const handleClose = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  // handler for showing the right stars
  const decideIfFavorited = () => {
    if (window.localStorage.getItem('favorites').includes(itemInfo.id)) {
      return <CardButtonIcon className="fa-solid fa-star"></CardButtonIcon>;
    } else {
      return <CardButtonIcon className="far fa-star"></CardButtonIcon>;
    }
  }

  if (itemInfo && itemStyles) {
    return (
      <CardDiv id={type} onClick={changeCards}>

        <CardButton onClick={buttonHandler}>
          {type === 'related' ? decideIfFavorited() : <CardButtonIcon className="fa-solid fa-xmark"></CardButtonIcon>}
        </CardButton>

        {type === 'related' &&
          <Comparison itemInfo={itemInfo} currentProd={currentProd} getProduct={getProduct} isModalOpen={isModalOpen} onClose={handleClose} />}

        { defaultImg ?
          <CardImage src={defaultImg}/> : <CardImage src={"./images/no-image.png"}/>}

        <CardInfo>
          <CardCategory>{itemInfo.category}</CardCategory>
          <CardName>{itemInfo.name}</CardName>

          {salePrice ?
            <CardPrice>
              ${salePrice}<CardSalePrice>${originalPrice}</CardSalePrice>
            </CardPrice> : <CardPrice>${originalPrice}</CardPrice> }

            <StarComponent productID={itemInfo.id} size={{ height: 16.6, width: 14 }}/>

        </CardInfo>
      </CardDiv>
    );
  }
});

// STYLING
export const CardDiv = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 180px;
  min-width: 180px;
  height: 95%;
  margin-top: 0;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: none;
  &:hover {
    opacity: 50%;
  }
`;

const CardButton = styled.button`
  position: relative;
  float: right;
  z-index: 1;
  padding: 5px;
  margin: 0;
  background-color: Transparent;
  border: none;
  color: black;
  font-size: 1.2em;
  &:hover {
    color: white;
  }
`;

const CardButtonIcon = styled.i`
  &:hover {
    text-shadow: 0px 0px 10px purple;
  }
`;

const CardImage = styled.img`
  position: relative;
  margin-bottom: 0px;
  bottom: 0;
  width: 100%;
  height: 75%;
  max-height: 250px;
  min-height: 180px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 5px;
`

const CardInfo = styled.span`
  padding: 0px;
  margin: 2px;
`;

const CardCategory = styled.p`
  text-transform: uppercase;
  color: rgb(125, 120, 161);
  font-size: 0.7em;
  padding: 0px;
  margin: 2px;
`;

const CardName = styled.h4`
  font-size: .85em;
  padding: 0px;
  margin: 2px;
`;

const CardPrice = styled.p`
  font-size: .85em;
  padding: 0px;
  margin: 2px;
  color: rgb(125, 120, 161);
`;

const CardSalePrice = styled.p`
  text-decoration: line-through;
  color: red;
`;

export default Card;
