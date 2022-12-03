import React from 'react';
import Stars from './Stars.jsx';



const ProductInfo = ({ product }) => (
  <div className="product-info">
    Product Inf
    <Stars id={product.id} />
  </div>);


export default ProductInfo;
