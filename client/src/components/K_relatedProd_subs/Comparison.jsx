import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Characteristic from './Characteristic.jsx';

const Comparison = function ({ itemInfo, currentProd, getProduct, isModalOpen, onClose }) {
  const [allFeatures, setAllFeatures] = useState({});
  const relatedProdFeatures = itemInfo.features;
  let currentProdFeatures = null;

  // initilizing all features from both products to pass down to characteristic modules
  useEffect(() => {
    getProduct(currentProd.id, (data) => {
      currentProdFeatures = data.features;
      setAllFeatures(mapFeatures());
    });
  }, []);

  // helper func to create all features object to pass down to Characteristic component
  const mapFeatures = () => {
    const featureObj = {};

    relatedProdFeatures.forEach((feature) => {
      featureObj[feature.feature] = [null, null];
      featureObj[feature.feature][0] = feature.value;
    });

    currentProdFeatures.forEach((feature) => {
      featureObj[feature.feature] = featureObj[feature.feature] || [null, null];
      featureObj[feature.feature][1] = feature.value;
    });

    return featureObj;
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-bg-compare" />
      <div className="modal_compare">
        <div className="modal_content">
          <div className="modal-header" id="flex-box">
            <h4 id="center">Comparing</h4>
            <button className="modal_button" id="right" onClick={onClose}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-products" id="flex-box">
            <span id="left">{itemInfo.name}</span>
            <span id="center"></span>
            <span id="right">{currentProd.name}</span>
          </div>
          <div className="modal_container">
            {allFeatures &&
              Object.keys(allFeatures).map((feature) => {
                const relatedChar = allFeatures[feature][0];
                const currentChar = allFeatures[feature][1];
                if (relatedChar || currentChar) {
                  return (
                    <div className="compare-characteristics" key={feature}>
                      <Characteristic key={feature} relatedChar={relatedChar} currentChar={currentChar}/>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('pop-up'),
  );
};

export default Comparison;
