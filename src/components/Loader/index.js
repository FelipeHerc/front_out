import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import cato from './duck.json'
import Lottie from 'lottie-react-web'


const StyledLoader = styled.div`
  align-items: center;
  text-align: center;
  color: #3C6AC2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px;
`;

const Loader = () => (
  <StyledLoader>
    <h1>Carregando...</h1>
    <Lottie
      options={{
        animationData: cato
      }}
      width={700}
      height={700}
    />
  </StyledLoader>
);

export default Loader;
