import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comparison from './Comparison.jsx';
import Stars from '../A_overview_subs/Stars.jsx';

const Card = function ({ type, currentProd, item, addToFavorites, deleteFromFavorites, setProduct }) {
  const [itemInfo, setItemInfo] = useState(null);
  const [itemStyles, setItemStyles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // inititlizing states for info and styles based on prod id
  useEffect(() => {
    if (item) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${item}`, {
          headers: { Authorization: process.env.GITHUB_TOKEN },
        })
          .then(({ data }) => setItemInfo(data))
          .catch((err) => console.log(err));

      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${item}/styles`, {
        headers: { Authorization: process.env.GITHUB_TOKEN },
      })
        .then(({ data }) => setItemStyles(data.results))
        .catch((err) => console.log(err));
    }
  }, [item]);

  // inititlizing default img url to be used later
  let defaultImg = '';
  let originalPrice = null;
  let salePrice = null;

  if (itemStyles) {
    itemStyles.forEach((style) => {
      if (style['default?']) {
        defaultImg = style.photos[0].thumbnail_url;
        originalPrice = style.original_price;
        salePrice = style.sale_price;
      }
    });

    // corner case: grabs the first style if there are no default styles defined
    if (!originalPrice) {
      defaultImg = itemStyles[0].photos[0].thumbnail_url;
      originalPrice = itemStyles[0].original_price;
      salePrice = itemStyles[0].sale_price;
    }
  }

  // handler for the favorite/delete button
  const buttonHandler = (e) => {
    e.stopPropagation();
    if (type === 'related') {
      //addToFavorites(itemInfo.id);
      setIsModalOpen(true);
    } else {
      deleteFromFavorites(itemInfo.id);
    }
  };

  // handler for changing current product page to product user has clicked
  const changeCards = () => {
    if (itemInfo) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${itemInfo.id}`, {
          headers: { Authorization: process.env.GITHUB_TOKEN },
      })
        .then(({ data }) => {
          if (itemInfo.id !== currentProd.id) {
            setProduct(data);
          }
        })
        .catch((err) => console.log(err));
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
        <Comparison itemInfo={itemInfo} currentProd={currentProd} isModalOpen={isModalOpen} onClose={handleClose} />}

        <img src={defaultImg} className="card_image"/>

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
