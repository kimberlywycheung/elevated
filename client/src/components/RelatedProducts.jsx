import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './K_relatedProd_subs/Carousel.jsx';

const RelatedProducts = ({ product }) => {
  const [outfits, setOutfits] = useState([]);
  const [relatedIds, setRelatedIds] = useState([]);

  useEffect(() => {
    setOutfits(window.localStorage.getItem('favorites'));
  }, [outfits])

  useEffect(() => {
    if (product.id) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/related`, {
        headers: { 'Authorization': process.env.GITHUB_TOKEN }
      })
      .then(({ data }) => setRelatedIds(data))
      .catch((err) => console.log(err));
    }
  }, [product])

  return (
    <div className='related-products'>
      RelatedProducts Div
      <Carousel type='related' currentState={relatedIds} currentProd={product}/>
      <Carousel type='outfits' currentState={outfits} currentProd={product}/>
    </div>
  )
}

export default RelatedProducts;