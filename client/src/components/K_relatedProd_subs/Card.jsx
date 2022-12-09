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

  const handleClose = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  // handler for showing the right stars
  const decideIfFavorited = () => {
    if (window.localStorage.getItem('favorites').includes(itemInfo.id)) {
      return <i className="fa-solid fa-star"></i>;
    } else {
      return <i className="far fa-star"></i>;
    }
  }

  // TODO: can refactor saleprice later
  if (itemInfo && itemStyles) {
    return (
      <CardDiv id={type} onClick={changeCards}>

        <CardButton onClick={buttonHandler}>
          {type === 'related' ? decideIfFavorited() : <i className="fa-solid fa-xmark"></i>}
        </CardButton>

        {type === 'related' &&
          <Comparison itemInfo={itemInfo} currentProd={currentProd} getProduct={getProduct} isModalOpen={isModalOpen} onClose={handleClose} />}

        { defaultImg ?
          <CardImage src={defaultImg}/> : <CardImage src={"../../client/dist/images/no-image.png"}/>}

        <span className="card_info">
          <p className="card_info" id="card-category">{itemInfo.category}</p>
          <h4 className="card_info" id="card-name">{itemInfo.name}</h4>

          {salePrice ?
            <p className="card_info">
              <p className="sale_price" id="card-price">
                ${salePrice}<strike>${originalPrice}</strike>
              </p>
            </p> : <p className="card_info" id="card-price">${originalPrice}</p> }

          <div className="card-stars-container">
            <StarComponent productID={itemInfo.id}/>
          </div>

        </span>
      </CardDiv>
    );
  }
});

export const CardDiv = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 180px;
  height: 95%;
  min-width: 180px;
  margin-top: 0;
  margin-left: 20px;
  margin-bottom: 10px;
  overflow: none;
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
  &:hover {
    opacity: 80%;
  }
`

export default Card;
