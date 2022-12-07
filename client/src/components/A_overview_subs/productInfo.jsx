import React from 'react';
import Stars from './Stars.jsx';



const ProductInfo = ({ product, style }) => (
  <div className="ov-header">
    <Stars id={product.id} />
    <h4 className='ov-category'>{product.category}</h4>
    <h1 className='ov-title'>{product.name}</h1>
    {style ? <div className='ov-price'>{style.original_price}</div> : null}

  </div>);


export default ProductInfo;
