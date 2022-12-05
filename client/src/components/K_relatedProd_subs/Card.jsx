import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comparison from './Comparison.jsx';

const Card = function ({ type, item, addToFavorites, deleteFromFavorites }) {
  const [itemInfo, setItemInfo] = useState(null);
  const [itemStyles, setItemStyles] = useState(null);

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

  if (itemStyles) {
    itemStyles.forEach((style) => {
      if (style['default?']) {
        defaultImg = style.photos[0].thumbnail_url;
      }
    });
  }

  // handler for the favorite/delete button
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
        <img src={defaultImg} />
        <button onClick={clickHandler}>{buttonText}</button>
        <p>{itemInfo.name}</p>
        <p>{itemInfo.category}</p>
        <p>(insert price)</p>
        <p>(insert stars)</p>
      </div>
    );
  }
};

export default Card;
