import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './A_overview_subs/ImageGallery.jsx';
import ProductInfo from './A_overview_subs/productInfo.jsx';
import StyleSelector from './A_overview_subs/StyleSelector.jsx';
import AddToCart from './A_overview_subs/AddToCart.jsx';
//testing

const Overview = ({ product }) => {

  if (product.id) {
    const [style, setStyle] = useState(null);
    const [styles, setStyles] = useState(null);
    const [skus, setSkus] = useState(null); //entire skus object with size/quantity
    const [sku, setSku] = useState(null); //current sku number



    const getStyles = async () => {

      const { data: { results } } = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, {
        headers: { Authorization: process.env.GITHUB_TOKEN }
      })

      setStyles(results);
      setStyle(results[0]);
      setSkus(results[0].skus);
      setSku(Object.keys(results[0].skus)[0]);
    }


    React.useEffect(() => {
      getStyles();
    }, []);


    return (
      <div className='overview'>
        Overview Div
        <ImageGallery />
        <ProductInfo product={product} style={style} />
        {style ? <StyleSelector styles={styles} style={style} /> : null}
        {style ? <AddToCart sku={sku} skus={skus} /> : null}
      </div>
    )
  }
}
export default Overview;

