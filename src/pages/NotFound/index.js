import React from 'react';
import styled from 'styled-components';
import cato from './cat.json'
import Lottie from 'lottie-react-web'

const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 5vw 20px 10vw;
`
const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`

export const NotFound = () => {
  return (
    <ErrorBox>
      <Lottie
        options={{
          animationData: cato
        }}
        width={850}
        height={850}
      />
      <ErrorMessage>
        <h1>404</h1>
        <p>Sorry, the page you requested could not be found.</p>
      </ErrorMessage>
    </ErrorBox>
  );
};
