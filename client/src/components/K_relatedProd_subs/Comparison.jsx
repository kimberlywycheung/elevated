import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
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
      <ComparisonModalBackground onClick={onClose} />

      <ComparisonModal onClick={(e) => e.stopPropagation()}>

          <ModalHeader>
            <h3 id="center">Comparing</h3>
            <ModalCloseButton onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </ModalCloseButton>
          </ModalHeader>

          <ModalProducts>
            <span id="left">{itemInfo.name}</span>
            <span id="center"></span>
            <span id="right">{currentProd.name}</span>
          </ModalProducts>

          <ModalComparison>

            {allFeatures &&
              Object.keys(allFeatures).map((feature) => {
                const relatedChar = allFeatures[feature][0];
                const currentChar = allFeatures[feature][1];
                if (relatedChar || currentChar) {
                  return (
                    <Characteristic key={feature} feature={feature} relatedChar={relatedChar} currentChar={currentChar}/>
                  );
                }
              })}

          </ModalComparison>

      </ComparisonModal>
    </>,
    document.getElementById('pop-up'),
  );
};

const ComparisonModalBackground = styled.div`
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
`;

const ComparisonModal = styled.div`
  font-family: 'Varela Round', sans-serif;
  position: fixed;
  z-index: 10;
  background-color: #fefefe;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #888;
  width: 55%;
  height: 35%
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

const ModalProducts = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`

const ModalCloseButton = styled.button`
  z-index: 10;
  position: relative;
  top: 0;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  background-color: transparent;
`;

const ModalComparison = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  white-space: nowrap;
  height: 60%;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 25px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Comparison;
