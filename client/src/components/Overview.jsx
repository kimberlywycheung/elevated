import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './A_overview_subs/ImageGallery.jsx';
import ProductInfo from './A_overview_subs/productInfo.jsx';
import StyleSelector from './A_overview_subs/StyleSelector.jsx';
import AddToCart from './A_overview_subs/AddToCart.jsx';
//testing

const Overview = ({ product }) => {

  if (product.id) {
    const [style, setStyle] = useState(undefined);
    const [styles, setStyles] = useState(undefined);
    const [skus, setSkus] = useState(undefined); //entire skus object with size/quantity
    const [sku, setSku] = useState(undefined); //current sku number



    const getStyles = async () => {

      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN};
      axios({method: 'get', url, headers: auth})
      .then((res) => {
        var results = res.data.results;
        console.log('results', results);
        //do stuff with results
        setStyles(results);
        setStyle(results[0]);
        setSkus(results[0].skus);
        setSku(Object.keys(results[0].skus)[0]);
      })
      .catch((err) => {
        alert('error\n' + err);
        console.error(err);
      })

      // const { data: { results } } = await axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, {
      //   headers: { Authorization: process.env.GITHUB_TOKEN }
      // })

      // setStyles(results);
      // setStyle(results[0]);
      // setSkus(results[0].skus);
      // setSku(Object.keys(results[0].skus)[0]);
    }


    React.useEffect(() => {
      getStyles();
    }, []);


    return (
      <div className="ov-section overview">

        <div className="ov-img-container">
          <ImageGallery style={style} styles={styles} />
        </div>

        <div className="ov-info">
          <ProductInfo product={product} style={style} />
          {style ? <StyleSelector styles={styles} style={style} /> : null}
          {style ? <AddToCart sku={sku} skus={skus} /> : null}
        </div>

      </div>
    )
  }
}
export default Overview;

