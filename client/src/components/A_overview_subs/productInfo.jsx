import React from 'react';
import Stars from './Stars.jsx';
import StarComponent from '../StarComponent.jsx';



const ProductInfo = ({ product, style }) => (
  <div className="ov-header">
    <StarComponent productID={product.id}/>
    <h4 className='ov-category'>{product.category}</h4>
    <h1 id='prod-title'>{product.name}</h1>
    {style ? <div className='ov-price'>{style.original_price}</div> : null}

  </div>);


export default ProductInfo;
