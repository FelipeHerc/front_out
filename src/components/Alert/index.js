import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 

const SavedBox = styled.div`
  margin: 10px 0 0 0;
  text-align: center;
  color: #303f9f
`

const Alert = ({ text }) => {
  return(
    <SavedBox><i>{text}</i></SavedBox>
  )
}

Alert.protoTypes = {
  text: string.isRequired,
}

export default Alert;