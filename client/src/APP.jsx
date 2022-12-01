import React from 'react';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = React.useState({});


  React.useEffect( () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
    headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
    .then((results) => setProduct(results.data[0]))
    .catch((err) => console.log(err));
  }, [product])

  return (
    <div id='root'>
      <h1>Del Taco Product Page1</h1>
      <Overview product={product}/>
      <RatingsReviews product={product}/>
      <QuestionsAnswers product={product}/>
      <RelatedProducts product={product}/>
    </div>
  )
};

export default App;