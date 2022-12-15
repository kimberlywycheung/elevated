import React from 'react';
import styled from 'styled-components';

const Characteristic = function ({ feature, relatedChar,  currentChar}) {
  relatedChar = relatedChar || <i className="fa-solid fa-xmark"></i>;
  currentChar = currentChar || <i className="fa-solid fa-xmark"></i>;

  return (
    <div>
      <Characteristics>
          <CharacteristicName>
            <Feature>{relatedChar}</Feature>
          </CharacteristicName>

          <Feature>{feature}</Feature>

          <CharacteristicName>
            <Feature>{currentChar}</Feature>
          </CharacteristicName>
        </Characteristics>
    </div>
  );

};

const Characteristics = styled.div`
  height: 30px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Feature = styled.p`
  font-size: 0.85em;
  min-width: 80px;
  text-align: center;
`;

const CharacteristicName = styled.div`
  min-width: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow-wrap: break-word;
`;

export default Characteristic;
