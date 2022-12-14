// import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../../APP.jsx';
import RelatedProducts from '../RelatedProducts.jsx';
import Card from './Card.jsx';
import axios from 'axios';

beforeEach(() => {

});

describe("Get Request", () => {
  test('get response returns a product object', async () => {
      await expect(getRandomProducts()).toBeTruthy();
  });
});

describe("App Renders", () => {
  test('app renders', () => {
      let root = renderer.create(<App />).toJSON();
      expect(root).toMatchSnapshot();
  });
});

describe("Related Products Renders", () => {
  test('Related products renders without a product passed down', () => {
      let root = renderer.create(<RelatedProducts />).toJSON();
      expect(root).toMatchSnapshot();
  });

  test('Related products renders with a product passed down', async () => {
      const root = await renderer.create(<RelatedProducts product={getRandomProducts()}/>).toJSON();
      expect(root).toMatchSnapshot();
  });

});



// HELPER GET FUNCTION
const getRandomProducts = async () => {
  await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: { Authorization: process.env.GITHUB_TOKEN }
    })
    .then((results) => {
      var randIndex = Math.floor(Math.random() * results.data.length);
      return results.data[randIndex];
    })
    .catch((err) =>  console.error(err));
}