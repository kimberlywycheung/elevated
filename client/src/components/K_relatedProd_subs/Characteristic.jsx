import React from 'react';
import styled from 'styled-components';

const Characteristic = function ({ feature, relatedChar,  currentChar}) {
  // const relatedChar = allFeatures[feature][0];
  // const currentChar = allFeatures[feature][1];

  return (
    <div>
      {relatedChar &&
        <Characteristics>
              <CheckmarkContainer>
                <i className="fa-solid fa-check"/>
              </CheckmarkContainer>

              <CharacteristicName>{relatedChar}</CharacteristicName>

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

          <CharacteristicName>{currentChar}</CharacteristicName>

          <CheckmarkContainer>
            <i className="fa-solid fa-check" />
          </CheckmarkContainer>
        </Characteristics>}
    </div>
  );

  // return (
  //   <div>
  //     {relatedChar &&
  //       <Characteristics>
  //             <CheckmarkContainer>
  //               <i className="fa-solid fa-check"/>
  //             </CheckmarkContainer>

  //             <CharacteristicName>{relatedChar}</CharacteristicName>

  //             {currentChar === relatedChar ?
  //               <CheckmarkContainer>
  //                 <i className="fa-solid fa-check" />
  //               </CheckmarkContainer> : <CheckmarkContainer></CheckmarkContainer>}
  //         </Characteristics>}

  //     {currentChar && (relatedChar !== currentChar) &&
  //       <Characteristics>
  //         {relatedChar === currentChar ?
  //           <CheckmarkContainer>
  //             <i className="fa-solid fa-check" />
  //           </CheckmarkContainer> : <CheckmarkContainer></CheckmarkContainer>}

  //         <CharacteristicName>{currentChar}</CharacteristicName>

  //         <CheckmarkContainer>
  //           <i className="fa-solid fa-check" />
  //         </CheckmarkContainer>
  //       </Characteristics>}
  //   </div>
  // );
};

const Characteristics = styled.div`
  height: 30px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const CharacteristicName = styled.p`
  font-size: 0.85em;
`;

const CheckmarkContainer = styled.div`
  width: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export default Characteristic;
