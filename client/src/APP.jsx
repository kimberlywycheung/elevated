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
      console.log('Random Product->\n', results.data[randIndex]);
      setProduct(results.data[randIndex]);
    })
    .catch((err) => console.log(err));
  }

  React.useEffect( () => {
      get();
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', []);
    }
  }, [])

  return (
    <div id='root'>
      <h1>Del Taco Product Page1</h1>
      <Overview product={product}/>
      <RatingsReviews product={product}/>
      <QuestionsAnswers productID={product.id}/>
      <RelatedProducts product={product}/>
    </div>
  )
};

export default App;