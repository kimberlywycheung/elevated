import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comparison from './Comparison.jsx';

const Card = function ({ type, item, addToFavorites, deleteFromFavorites }) {
  const [itemInfo, setItemInfo] = useState(null);
  const [itemStyles, setItemStyles] = useState(null);

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

  let defaultImg = '';

  if (itemStyles) {
    itemStyles.forEach((style) => {
      if (style['default?']) {
        defaultImg = style.photos[0].thumbnail_url;
      }
    });
  }

  const clickHandler = () => {
    if (type === 'related') {
      addToFavorites(itemInfo.id);
    } else {
      deleteFromFavorites(itemInfo.id);
    }
  };

  const buttonText = type === 'related' ? 'Favorite' : 'Delete';

  if (itemInfo && itemStyles) {
    return (
      <div>
        <button onClick={clickHandler}>{buttonText}</button>
        <img src={defaultImg} />
        <p>{itemInfo.name}</p>
        <p>{itemInfo.category}</p>
        <p>(insert price)</p>
        <p>(insert stars)</p>
      </div>
    );
  }
};

export default Card;
