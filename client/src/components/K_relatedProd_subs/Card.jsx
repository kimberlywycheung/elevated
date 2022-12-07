import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comparison from './Comparison.jsx';
import Stars from '../A_overview_subs/Stars.jsx';

const Card = function ({ type, currentProd, item, deleteFromFavorites, setProduct }) {
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
    originalPrice = style.original_price;
    salePrice = style.sale_price;
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
  const changeCards = () => {
    if (itemInfo) {
      getProduct(itemInfo.id, (data) => {
        if (itemInfo.id !== currentProd.id) {
          setProduct(data);
        }
      });
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  // TODO: can refactor saleprice later
  if (itemInfo && itemStyles) {
    return (
      <div className="card" id={type} onClick={changeCards}>

        <button className="card_button" onClick={buttonHandler}>
          {type === 'related' ?
            <img src="../../client/dist/images/star.png" width="20"/> : ' X '}
        </button>

        {type === 'related' &&
          <Comparison itemInfo={itemInfo} currentProd={currentProd} getProduct={getProduct} isModalOpen={isModalOpen} onClose={handleClose} />}

        { defaultImg ?
          <img src={defaultImg} className="card_image"/> : <img src={"../../client/dist/images/no-image.png"} className="card_image"/>}


        <span className="card_info">
          <p className="card_info">{itemInfo.category}</p>
          <h4 className="card_info">{itemInfo.name}</h4>

          {salePrice ?
            <p className="card_info">
              <span className="sale_price">${salePrice}</span>
              <strike>${originalPrice}</strike>
            </p> : <p className="card_info">${originalPrice}</p> }

          <Stars id={itemInfo.id}/>
        </span>
      </div>
    );
  }
};

export default Card;
