import React, { useEffect } from 'react';
import axios from 'axios';
import Characteristic from './Characteristic.jsx';

const Comparison = function ({ itemInfo, currentProd, isModalOpen, onClose }) {
  // let currentProdFeatures = null;
  // let relatedProdFeatures = itemInfo.features;

  // useEffect(() => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentProd.id}`, {
  //   headers: { Authorization: process.env.GITHUB_TOKEN },
  //   })
  //     .then(({ data }) => {
  //       currentProdFeatures = data.features;
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  if (!isModalOpen) return null;

  return (
    <div>
      <p>Comparing</p>
      <button onClick={onClose}>Close</button>
      <p>{itemInfo.name}</p><p>{currentProd.name}</p>
      {/* {allFeatures.map((feature) => {
        return <Characteristic key={feature.feature}/>;
      })} */}
    </div>
  );
};

export default Comparison;
