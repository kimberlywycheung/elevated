import React from 'react';
import Stars from './Stars.jsx';



const ProductInfo = ({ product, style }) => (
  <div className="product-info">
    Product Info
    <Stars id={product.id} />
    <div className='category'>Product Category: {product.category}</div>
    <div className='expanded-product-name'>Expanded Product Name: {product.name}</div>
    {style ? <div className='price'>Original Price: {style.original_price}</div> : null}

  </div>);


export default ProductInfo;
