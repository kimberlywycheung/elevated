import React from 'react';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QA.jsx';
import RelatedProducts from './components/RelatedProducts.jsx';
import axios from 'axios';
import $ from 'jquery';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';

//STYLE ROOT
//margin: 20px auto;

const ThemeToggle = styled.button`
  position: fixed;
  top: 0;
  left: 0;
`;

const RootDiv = styled.div`
  font-family: 'Varela Round', sans-serif;
  color: ${props => props.theme.fontColor};
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 0;
    & > h1 {
      color: rgb(97, 7, 111)
    }
  `;
//GLOBAL STYLE
const GlobalStyles = createGlobalStyle`
html {
  background-color: ${props => props.theme.bg}
}
#root {
  border: solid ${props => props.theme.border} 18px;
}

button {
  padding: 20px;
  font-size: 1em;
  margin: 10px;
}
a {
  cursor: pointer;
}
h2 {
  color: ${props => props.theme.h2}
  font-size: 1.7rem;
  font-family: 'PT Sans Caption', sans-serif;
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
  const [isDarkTheme, setDarkTheme] = React.useState(false);
  const ref = React.useRef();

  const lightTheme = {
    bg: 'white',
    h2: 'black',
    fontColor: 'rgb(56, 56, 56)',
    border: 'rgba(244, 244, 244, 0.552)',
    searchBG: 'white'
  }
  const darkTheme = {
    bg: 'rgb(56, 56, 56)',
    h2: 'white',
    fontColor: 'white',
    border: 'rgba(72, 72, 72, 0.3)',
    searchBG: 'rgb(56, 56, 56)'

  }

  const get = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
      .then((results) => {
        // var randIndex = Math.floor(Math.random() * results.data.length);
        var randIndex = 4;

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

  $('.toggleTheme').click(() => {
    setDarkTheme(!isDarkTheme);
  })

  return ( product &&
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme} >
      <RootDiv id='root' ref={ref}>

           <label className="switch1">
            <input className='toggleTheme' type="checkbox"></input>
            <span className="slider1 round1"></span>
          </label>

        {/* <ThemeToggle onClick={e => {e.preventDefault(); setDarkTheme(!isDarkTheme)}}>THEME</ThemeToggle> */}
        <GlobalStyles fontColor='rgb(56, 56, 56)' bg='white'/>
        <div id='header-img'>
          <span style={{display: 'inline-block'}}>Del</span>
          <img className='taco-img' src='./images/TacoHeader2.png'></img>
          <span style={{display: 'inline-block'}}>Taco</span>
        </div>
        <Overview product={product}/>
        <RelatedProducts product={product} setProduct={setProduct} ref={ref}/>
        <QuestionsAnswers productID={product.id}/>
        <RatingsReviews product={product}/>

      </RootDiv>
    </ThemeProvider>
  )
};

export default App;

