import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './K_relatedProd_subs/Carousel.jsx';

const RelatedProducts = function ({ product }) {
  const [outfits, setOutfits] = useState([]);
  const [relatedIds, setRelatedIds] = useState([]);

  // remove any duplicates from outfits and relatedIds
  let deduplicate = (ids) => {
    ids = [...new Set(ids)];
    return Array(ids)[0];
  };

  // grabs any existing locally stored favorites
  useEffect(() => {
    let currentFavs = window.localStorage.getItem('favorites');
    currentFavs = currentFavs.replace(/\r?\n|\r/g, '').split(','); //convert localstorage string to array
    console.log('initial loaded outfits', currentFavs);
    setOutfits(currentFavs);
  }, []);

  // inititlizes state for relatedIds whenever the product changes
  useEffect(() => {
    if (product.id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/related`, {
        headers: { Authorization: process.env.GITHUB_TOKEN },
      })
        .then(({ data }) => setRelatedIds(deduplicate(data)))
        .catch((err) => console.log(err));
    }
  }, [product]);

  // updates local storage whenever outfits state is updated
  useEffect(() => {
    window.localStorage.setItem('favorites', outfits);
  }, [outfits]);

  // helper functions for editing outfit states
  const addToFavorites = (id) => {
    id = JSON.stringify(id);

    if (!outfits.includes(id)) {
      let newOutfits = outfits.slice();
      newOutfits.push(id);
      setOutfits(newOutfits);
    }
  };

  const deleteFromFavorites = (id) => {
    id = JSON.stringify(id);

    let newOutfits = outfits.slice();

    for (let i = newOutfits.length - 1; i >= 0; i--) {
      if (newOutfits[i] === id) {
        newOutfits.splice(i, 1);
        setOutfits(newOutfits);
        return;
      }
    }
  };

  return (
    <div className="related-products">
      <Carousel type="related" currentState={relatedIds} currentProd={product} addToFavorites={addToFavorites}/>
      <Carousel type="outfits" currentState={outfits} currentProd={product} addToFavorites={addToFavorites} deleteFromFavorites={deleteFromFavorites}/>
    </div>
  );
};

export default RelatedProducts;
