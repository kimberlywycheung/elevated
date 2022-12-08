import React from 'react';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = React.useState({});

  const get = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
    .then((results) => {
      var randIndex = Math.floor(Math.random() * results.data.length);
      // var randIndex = 3;
      console.log(`Random Product from index ${randIndex}->\n`, results.data[randIndex]);
      setProduct(results.data[randIndex]);
    })
    .catch((err) => console.error(err));
  }

  React.useEffect( () => {
    get();
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', '');
    }
  }, [])

  // can delete later - purpose is to log current prod when user clicks on product card from related products section
  React.useEffect( () => {
    console.log('product has been changed to: ', product);
  }, [product]);

  return (
    <div id='root'>
      <h1>Del Taco Product Page1</h1>
      {/* <Overview product={product}/> */}
      <RatingsReviews product={product}/>
      <QuestionsAnswers productID={product.id}/>
      {/* <RelatedProducts product={product} setProduct={setProduct}/> */}
    </div>
  )
};

export default App;