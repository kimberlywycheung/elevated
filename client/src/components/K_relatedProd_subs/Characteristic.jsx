import React from 'react';
import styled from 'styled-components';

const Characteristic = function ({ feature, relatedChar,  currentChar}) {
  return (
    <div>
      {relatedChar &&
        <Characteristics>
              <CheckmarkContainer>
                <i className="fa-solid fa-check"/>
              </CheckmarkContainer>

              <p>{relatedChar}</p>

              {currentChar === relatedChar ?
                <CheckmarkContainer>
                  <i className="fa-solid fa-check" />
                </CheckmarkContainer> : <CheckmarkContainer></CheckmarkContainer>}
          </Characteristics>}

      {currentChar && (relatedChar !== currentChar) &&
        <Characteristics>
          {relatedChar === currentChar ?
            <CheckmarkContainer>
              <i className="fa-solid fa-check" />
            </CheckmarkContainer> : <CheckmarkContainer></CheckmarkContainer>}

          <p>{currentChar}</p>

          <CheckmarkContainer>
            <i className="fa-solid fa-check" />
          </CheckmarkContainer>
        </Characteristics>}
    </div>
  );
};

const Characteristics = styled.div`
  height: 30px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const CheckmarkContainer = styled.div`
  width: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export default Characteristic;
