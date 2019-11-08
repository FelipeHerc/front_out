import React, { Component } from 'react';
import styled from 'styled-components';
import { getAllNotebook } from '../../store/modules/getNotebook';
import { getAllStat } from '../../store/modules/getStat';
import { getAllChip } from '../../store/modules/getChip';
import { getAllCel } from '../../store/modules/getCel';


const StyledListBox = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin: 20px 10vw 20px 10vw;
  padding: 10px;
  align-items: center;
  align-content: center;
  align-items: baseline;
  border-radius: 5px;
`;

class Ownerships extends Component{

  componentDidMount() {
    console.log('a');
  }

  render()
  {
    return(
      <StyledListBox>
        <h1>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
      </StyledListBox>
    );
  }
};

export default (Ownerships);
