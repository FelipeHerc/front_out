import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllCel } from '../../store/modules/getCel';
import { array } from 'prop-types';
import { CelCard, Loader } from '../../components'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';

const ButtonBox = styled.div`
  margin: auto 17px;
`

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

const H2 = styled.h2`
  margin: 10px 0px 10px 20px;
`;

const Row = styled.div`
    display: flex;    
    flex-direction: row;
    justify-content: space-between;
`;

class Cel extends Component{
  constructor() {
    super();

    this.state = {
      open: false
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
  
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getAllCel();
  }
  render()
  {
    const classes = {
      button: {
        margin: 5,
        height: 20
      },
      input: {
        display: 'none',
      }
    }
    const { open } = this.state;
    const { cel, loaded, loading } = this.props;
    console.log(loading);
    console.log(cel)
    return (
        <Fragment>
          {
            loading ? <Loader/> : (
              <StyledListBox>
                <Row>
                  <H2>Smartphones</H2>
                  <ButtonBox>
                    <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={this.onOpenModal}>
                      Criar novo Smartphone
                    </Button>
                  </ButtonBox>
                  <Modal open={open} onClose={this.onCloseModal} onExited={() => this.props.getAllCel()} center>
                    aa
                  </Modal>
                </Row>
                {
                  cel.map((item) => (
                    <CelCard 
                      id={item.id}
                      brand={item.attributes.brand}
                      imei1={item.attributes.imei1}
                      imei2={item.attributes.imei2}
                      model={item.attributes.model}
                      statId={item.attributes.stat.id}
                      stat={item.attributes.stat.description}
                    />
                  ))
                }
                
              </StyledListBox>
            )
          }
        </Fragment>

            
    )
  }
}

Cel.defaultProps = {
  cel: [],
};

Cel.propTypes = {
  cel: array,
};

const mapStateToProps = ({ cel: { cel, getAllCel, loaded, loading } }) => ({
  cel,
  getAllCel,
  loaded,
  loading,
});

export default connect(mapStateToProps, { getAllCel } )(Cel);
