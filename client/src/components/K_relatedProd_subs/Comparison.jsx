import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Characteristic from './Characteristic.jsx';

const Comparison = function ({ itemInfo, currentProd, getProduct, isModalOpen, onClose }) {
  const [allFeatures, setAllFeatures] = useState({});
  const relatedProdFeatures = itemInfo.features;
  let currentProdFeatures = null;

  const [showTopGradient, setShowTop] = useState(false);
  const [showBottomGradient, setShowBottom] = useState(true);

  // initilizing all states for products/styles and gradient states
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

  const handleScroll = () => {
    const compareElement = document.getElementById('feature-comparison');

    setScroll(compareElement);
  };

  const setScroll = (element) => {
    const { scrollTop, scrollHeight, offsetHeight } = element;

    if (scrollHeight > 173) {
      // set top states
      if (scrollTop === 0) {
        setShowTop(false);
      }
      if (scrollTop > 0) {
        setShowTop(true);
      }
      // set bottom states
      if (scrollTop + offsetHeight === scrollHeight) {
        setShowBottom(false);
      }
      if (scrollTop + offsetHeight < scrollHeight) {
        setShowBottom(true);
      }
    } else {
      setShowTop(false);
      setShowBottom(false);
    }
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

        <ModalComparison id="feature-comparison" onScroll={handleScroll}>

          {showTopGradient &&
            <ModalTopGradient id="top-gradient"></ModalTopGradient>}

          {allFeatures &&
            Object.keys(allFeatures).map((feature) => {
              const relatedChar = allFeatures[feature][0];
              const currentChar = allFeatures[feature][1];
              if (relatedChar || currentChar) {
                return (
                  <Characteristic key={feature} feature={feature} relatedChar={relatedChar} currentChar={currentChar} />
                );
              }
            })}

          {showBottomGradient &&
            <ModalBottomGradient id="bottom-gradient"></ModalBottomGradient>}

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
  height: 32%
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
`;

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
  height: 135px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 25px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalTopGradient = styled.div`
  background-image: linear-gradient(white, transparent);
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  height: 30px;
`;

const ModalBottomGradient = styled.div`
  background-image: linear-gradient(180deg, transparent, white);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  height: 30px;
`;

export default Comparison;
