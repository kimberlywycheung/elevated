import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './K_relatedProd_subs/Carousel.jsx';

const RelatedProducts = function ({ product, setProduct }) {
  const [outfits, setOutfits] = useState([]);
  const [relatedIds, setRelatedIds] = useState([]);

  // grabs any existing locally stored favorites
  useEffect(() => {
    let currentFavs = window.localStorage.getItem('favorites');
    // converts localstorage string to array
    currentFavs = currentFavs.replace(/\r?\n|\r/g, '').split(',');
    setOutfits(currentFavs);
  }, []);

  // inititlizes state for relatedIds whenever the product changes
  useEffect(() => {
    if (product.id) {
      getRelated(product.id, (data) => {
        setRelatedIds(deduplicate(data));
      });
    }
  }, [product]);

  // updates local storage whenever outfits state is updated
  useEffect(() => {
    window.localStorage.setItem('favorites', outfits);
    console.log(window.localStorage);
  }, [outfits]);

  // helper functions for editing outfit states
  const addToFavorites = (id) => {
    id = JSON.stringify(id);

    if (!outfits.includes(id)) {
      const newOutfits = outfits.slice();
      newOutfits.push(id);
      setOutfits(newOutfits);
    }
  };

  const deleteFromFavorites = (id) => {
    id = JSON.stringify(id);

    const newOutfits = outfits.slice();

    for (let i = newOutfits.length - 1; i >= 0; i--) {
      if (newOutfits[i] === id) {
        newOutfits.splice(i, 1);
        setOutfits(newOutfits);
        return;
      }
    }
  };

  if (!product) {
    return (
      <div>loading...</div>
    );
  }

  return (
    <div className="related-products">
      <Carousel type="related" currentState={relatedIds} currentProd={product} addToFavorites={addToFavorites} setProduct={setProduct} />
      <Carousel type="outfits" currentState={outfits} currentProd={product} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites} setProduct={setProduct} />
    </div>
  );
};

// HELPER FUNCTIONS

// gets related products for current product
const getRelated = (endpoint, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${endpoint}/related`, {
    headers: { Authorization: process.env.GITHUB_TOKEN },
  })
    .then(({ data }) => cb(data))
    .catch((err) => console.log(err));
};

// remove any duplicates from relatedIds
const deduplicate = (ids) => {
  ids = [...new Set(ids)];
  return Array(ids)[0];
};

export default RelatedProducts;
