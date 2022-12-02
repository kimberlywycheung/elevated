import React from 'react';
import axios from 'axios';
import ImageGallery from './A_overview_subs/ImageGallery.jsx';
import ProductInfo from './A_overview_subs/productInfo.jsx';
//testing

const Overview = ({productID}) => {

  return (
    <div className='overview'>
      Overview Div
      <ImageGallery />
      <ProductImage />
    </div>
  )
}

export default Overview;