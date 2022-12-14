import React from 'react';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import axios from 'axios';
import styled, {createGlobalStyle} from 'styled-components';

//STYLE ROOT
const RootDiv = styled.div`
border: solid rgba(244, 244, 244, 0.552) 18px;
  font-family: 'Varela Round', sans-serif;
  color: rgb(56, 56, 56);
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 50px;
  `;
//GLOBAL STYLE
const GlobalStyles = createGlobalStyle`
button {
  padding: 20px;
  font-size: 1em;
  margin: 10px;
}
a {
  cursor: pointer;
}
.underline {
  text-decoration: underline;
}

.overview {
  padding: 5px;
  margin: 10px;
}
.questions-answers {
  background-color: rgb(216, 190, 183);
  color: white;
  min-height: 300px;
  margin: 10px;
}
`;



const App = () => {
  const [product, setProduct] = React.useState({});
  const ref = React.useRef();

  const get = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
      .then((results) => {
        var randIndex = Math.floor(Math.random() * results.data.length);
        // var randIndex = 4;

        console.log(`Random Product from index ${randIndex}->\n`, results.data[randIndex]);
        setProduct(results.data[randIndex]);
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    get();
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', '');
    }

  }, [])

  // can delete later - purpose is to log current prod when user clicks on product card from related products section
  React.useEffect(() => {
    console.log('product has been changed to: ', product);
  }, [product]);

  return (
    <RootDiv id='root' ref={ref}>
      <GlobalStyles />
      <div id='header-img'>
        <span style={{display: 'inline-block'}}>Del</span>
        <img className='taco-img' src='../dist/images/TacoHeader2.png'></img>
        <span style={{display: 'inline-block'}}>Taco</span>
      </div>
      <Overview product={product}/>
      <RelatedProducts product={product} setProduct={setProduct} ref={ref}/>
      <QuestionsAnswers productID={product.id}/>
      <RatingsReviews product={product}/>

    </RootDiv>
  )
};

export default App;

