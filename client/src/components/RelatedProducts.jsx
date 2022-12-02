import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from './K_relatedProd_subs/Carousel.jsx';

const RelatedProducts = ({ product }) => {
  // save state for related prods
  const [related, setRelated] = useState([]);
  // save state for outfits (local storage)
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (product.id) {
      get();
      console.log(related)
    }
  }, [product]);

  // const getRelated = () => {
  //   if (product.id) {
  //     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/related`, {
  //       headers: { 'Authorization': process.env.GITHUB_TOKEN }
  //     })
  //     .then((results) => setRelated(results.data))
  //     .catch((err) => console.log(err));
  //   }
  // }

  return (
    <div className='related-products'>
      RelatedProducts Div
      <Carousel type='related' currentState={related}/>
      <Carousel type='outfits' currentState={outfits}/>
    </div>
  )
}

export default RelatedProducts;