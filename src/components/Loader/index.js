import React from 'react';
import ReactLoading from 'react-loading';
import { getColor } from '../../utils/colors'
import styled from 'styled-components';

const StyledLoader = styled.div`
  align-items: center;
  text-align: center;
  color: ${props => getColor(2)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px;
`;

const Loader = () => (
  <StyledLoader>
    <h1>Carregando...</h1>
    <ReactLoading type="bars" color={getColor(2)} height={200} width={500} />
  </StyledLoader>
);
 
export default Loader;