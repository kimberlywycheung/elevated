import React from 'react';
import IndProdBrk from './IndProdBrk.jsx';

const ProductBrk = function ProductBrk({ breakdown }) {

  return (
    <div>
      {Object.keys(breakdown.characteristics).map((char) => {
        return <IndProdBrk key={breakdown.characteristics[char].id} char={char} breakdown={breakdown.characteristics}/>
      })}
    </div>
  )
}

export default ProductBrk;
