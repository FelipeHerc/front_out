import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllNotebook } from '../../store/modules/getNotebook';
import { getAllStat } from '../../store/modules/getStat';
import { array } from 'prop-types';
import { NotebookCard, Loader, CreateOrUpdateNotebook } from '../../components'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';

const ButtonBox = styled.div`
  margin: auto 17px;
`

const StyledListBox = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin: 20px 5vw 20px 10vw;
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

class Notebook extends Component{
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
    this.props.getAllNotebook();
    this.props.getAllStat();
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
    const { notebook, loadingNotebook } = this.props;
    const { stat, loadingStat } = this.props;

    return (
      <Fragment>
        {
          (loadingNotebook || loadingStat) ? <Loader/> : (
            <StyledListBox>
              <Row>
                <H2>Notebooks</H2>
                <ButtonBox>
                  <Button variant="outlined" color="primary" size="small" className={classes.button.toString()} onClick={this.onOpenModal}>
                    Criar novo Notebook
                  </Button>
                </ButtonBox>
                <Modal open={open} onClose={this.onCloseModal} onExited={() => this.props.getAllNotebook()} center>
                  <CreateOrUpdateNotebook isEditing={false} label="Criar Notebook" statList={stat} />
                </Modal>
              </Row>
              {
                notebook.map((item) => (
                  <NotebookCard 
                    id={item.id}
                    key={item.id}
                    brand={item.attributes.brand}
                    serialNumber={item.attributes['serial-number']}
                    model={item.attributes.model}
                    statId={item.attributes.stat.id}
                    stat={item.attributes.stat.description}
                    statList={stat}
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

Notebook.defaultProps = {
  notebook: [],
  stat: [],
};

Notebook.propTypes = {
  notebook: array,
  stat: array,
};

const mapStateToProps = ({ notebook: { notebook, getAllNotebook, loadedNotebook, loadingNotebook }, stat: { loadedStat, loadingStat, errorStat, stat }} ) => ({
  notebook,
  getAllNotebook,
  loadedNotebook,
  loadingNotebook,
  stat,
  loadedStat, 
  loadingStat, 
  errorStat, 
});

export default connect(mapStateToProps, { getAllNotebook, getAllStat } )(Notebook);
