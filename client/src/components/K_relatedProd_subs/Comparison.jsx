import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Characteristic from './Characteristic.jsx';

const Comparison = function ({ itemInfo, currentProd, isModalOpen, onClose }) {
  const [allFeatures, setAllFeatures] = useState({});

  let featureObj = {};
  let currentProdFeatures = null;
  let relatedProdFeatures = itemInfo.features;

  // initilizing all features from both products to pass down to characteristic modules
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentProd.id}`, {
    headers: { Authorization: process.env.GITHUB_TOKEN },
    })
      .then(({ data }) => {
        currentProdFeatures = data.features;
        setAllFeatures(mapFeatures());
      })
      .catch((err) => console.log(err));
  }, []);

  // helper func to create all feature object
  const mapFeatures = () => {
    relatedProdFeatures.forEach((feature) => {
      featureObj[feature.feature] = [null, null];
      featureObj[feature.feature][0] = feature.value;
    });

    currentProdFeatures.forEach((feature) => {
      featureObj[feature.feature] = featureObj[feature.feature] || [null, null];
      featureObj[feature.feature][1] = feature.value;
    });

    return featureObj;
  }

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-bg-compare" />
      <div className='modal_compare'>
        <div id="flex-box">
          <h4 id="center">Comparing</h4>
          <button className="modal_button" id="right" onClick={onClose}>close</button>
        </div>
        <div id="flex-box">
          <span id="left">{itemInfo.name}</span>
          <span id="center"></span>
          <span id="right">{currentProd.name}</span>
        </div >
        <div className='modal_container'>
          {allFeatures &&
            Object.keys(allFeatures).map((feature) => {
              return <Characteristic key={feature} feature={feature} items={allFeatures[feature]}/>;
            })}
        </div>
      </div>
    </>,
    document.getElementById('pop-up')
  );
};

export default Comparison;
