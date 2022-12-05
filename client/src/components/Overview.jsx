import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './A_overview_subs/ImageGallery.jsx';
import ProductInfo from './A_overview_subs/productInfo.jsx';
import StyleSelector from './A_overview_subs/StyleSelector.jsx';
//testing

const Overview = ({ product }) => {

  const [style, setStyle] = useState(null);
  const [styles, setStyles] = useState(null);


  const getStyles = async () => {
    const { data: { results } } = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles`, {
      headers: { Authorization: process.env.GITHUB_TOKEN }
    })
    setStyles(results);
    setStyle(results[0]);

  }
  React.useEffect(() => {
    getStyles();
  }, []);


  return (
    <div className='overview'>
      Overview Div
      <ImageGallery />
      <ProductInfo product={product} style={style} />
      <StyleSelector styles={styles} />
    </div>
  )
}

export default Overview;