import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllCel } from '../../store/modules/getCel';
import { array } from 'prop-types';
import { PersonCard, Loader } from '../../components'
import styled from 'styled-components';

const StyledListBox = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin: 20px 10vw 20px 10vw;
  padding: 10px;
  align-items: center;
  align-content: center;
  align-items: baseline;
  border-radius: 5px;
`;

class Cel extends Component{
  componentDidMount() {
    this.props.getAllCel();
  }
  render()
  {
    const { cel, loaded, loading } = this.props;

    return (
          <h1>a</h1>

            
    )
  }
}

Cel.defaultProps = {
  cel: [],
};

Cel.propTypes = {
  cel: array,
};

const mapStateToProps = ({ notebook: { cel, getAllCel, loaded, loading } }) => ({
  cel,
  getAllCel,
  loaded,
  loading,
});

export default connect(mapStateToProps, { getAllCel } )(Cel);
