import React from 'react';
import Stars from './Stars.jsx';
import StarComponent from '../StarComponent.jsx';



const ProductInfo = ({ theme, product, style }) => (style &&
  <div className="ov-header">
    <StarComponent theme={theme} productID={product.id} />
    <h4 className='ov-category'>{product.category.toUpperCase()}</h4>
    <h1 id='prod-title'>{product.name}</h1>
    <div className='ov-price'>
      {style.sale_price && <div className='ov-sale'>${style.sale_price}</div>}
      <div className='ov-og' id={style.sale_price ? 'sale' : null}>${style.original_price}</div>
    </div>

  </div>);


export default ProductInfo;
