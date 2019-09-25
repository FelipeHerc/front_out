import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getColor } from '../../utils/colors'

const StyledHeader = styled.div`
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: ${props => getColor(2)};
  position: sticky;
  top: 0;
  align-content: center;
  align-items: baseline;
  display: flex;
  flex-direction: row;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const StyledHome = styled.div`
  margin: 7px 15px 7px 15px;
  border-radius: 25px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => getColor(5)};
  color: ${props => getColor(5)};
  padding: 8px 12px;
`;

const StyledItem = styled.div`
  margin: 7px 15px 7px 15px;
  border-color: ${props => getColor(5)};
  color: ${props => getColor(5)};
  padding: 8px 12px;
  :hover{
    cursor: pointer;
    border-radius: 20px;
    background-color: ${props => getColor(3)};
  }
`;

class Header extends Component {
  render() {
    return (
      <StyledHeader>
      <Row>
        <StyledHome>Sisteminha</StyledHome>
        <StyledItem>Pessoas</StyledItem>
        <StyledItem>Equipamentos</StyledItem>
        <StyledItem>Empresas</StyledItem>
      </Row>

      </StyledHeader>

    )
  }
}
export default withRouter(Header);
