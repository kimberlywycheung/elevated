import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import axios from 'axios';

const App = () => {
  const [productID, setProductID] = React.useState(40344);

  return (
    <div id='root'>
      <h1>Del Taco Product Page</h1>
      <Overview productID={productID}/>
      <RatingsReviews productID={productID}/>
      <QuestionsAnswers productID={productID}/>
      <RelatedProducts productID={productID}/>
    </div>


  )

};


ReactDOM.render(<App />, document.getElementById('app'));

