import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  height: 40px;
  width: 75vw;
  margin: 10px;
  padding: 10px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
`;


const PersonList = ({id, name, cpf, company_name, sector_name}) => {
  return (
    <StyledBox>
      <p>{id}   </p>
      <p>{name}   </p>
      <p>{cpf}   </p>
      <p>{company_name}   </p>
      <p>{sector_name}   </p>
    </StyledBox>
  )

}

PersonList.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  cpf: string.isRequired,
  company_name: string.isRequired,
  sector_name: string.isRequired
};

export default PersonList;