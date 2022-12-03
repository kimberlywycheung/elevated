import React from 'react';
import axios from 'axios';
import ImageGallery from './A_overview_subs/ImageGallery.jsx';
import ProductInfo from './A_overview_subs/productInfo.jsx';
//testing

const Overview = ({product}) => {



  return (
    <div className='overview'>
      Overview Div
      <ImageGallery />
      <ProductInfo product={product} />
    </div>
  )
}

export default Overview;