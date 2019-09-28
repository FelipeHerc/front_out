import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 

const StyledButton = styled.button`
  border-radius: 6px;
  font-size: 16px;
  color: white;
  padding: 12px 10px;
  display: inline-block;
  text-decoration: none;
  border: none;
  text-align: center;
`;


const Button = ({ color, text }) => {

  const buttonColor = {
    "background-color": color,
    "&:hover": {
      "background-color": "#bababa"
    }
  };  

  return(
    <StyledButton style={buttonColor}>{text}</StyledButton>
  )
}

Button.protoTypes = {
  color: string.isRequired,
  text: string.isRequired,
}

export default Button;