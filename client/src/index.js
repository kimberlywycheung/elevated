import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';

const App = () => {

  return (
    <div id='root'>
      <h1>Del Taco Product Page</h1>
      <Overview />
      <RatingsReviews />
      <QuestionsAnswers />
      <RelatedProducts />
    </div>


  )

};


ReactDOM.render(<App />, document.getElementById('app'));

