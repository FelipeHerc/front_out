import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 
import { FaUserAlt } from "react-icons/fa";
const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 75vw;
  margin: 10px;
  padding: 10px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: Row;
`;

const Text = styled.div`
  margin: 0 10px 0 0;
`;

const PersonCard = ({id, name, cpf, company_name, sector_name}) => {
  return (
    <StyledBox>
      <FaUserAlt />
      <Col>
        <Row>
          <Text><strong>Nome:</strong> {name}</Text> 
          <Text>CPF: {cpf}</Text>
        </Row>
        <Row>
          <Text>Empresa: {company_name}</Text>
          <Text>Setor: {sector_name}</Text>
        </Row>
      </Col>
    </StyledBox>
  )

}

PersonCard.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  cpf: string.isRequired,
  company_name: string.isRequired,
  sector_name: string.isRequired
};

export default PersonCard;