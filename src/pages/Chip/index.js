import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllChip } from '../../store/modules/getChip';
import { getAllStat } from '../../store/modules/getStat';
import { array } from 'prop-types';
import { ChipCard, Loader, CreateOrUpdateChip } from '../../components'
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

class Chip extends Component{
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
    this.props.getAllChip();
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
    const { chip, loadingChip } = this.props;
    const { stat, loadingStat } = this.props;

    return (
        <Fragment>
          {
            (loadingChip || loadingStat) ? <Loader/> : (
              <StyledListBox>
                <Row>
                  <H2>Chips</H2>
                  <ButtonBox>
                    <Button variant="outlined" color="primary" size="small" className={classes.button.toString()} onClick={this.onOpenModal}>
                      Criar novo Chip
                    </Button>
                  </ButtonBox>
                  <Modal open={open} onClose={this.onCloseModal} onExited={() => this.props.getAllChip()} center>
                    <CreateOrUpdateChip isEditing={false} label="Criar Chip" statList={stat} />
                  </Modal>
                </Row>
                {
                  chip.map((item) => (
                    <ChipCard 
                      id={item.id}
                      key={item.id}
                      operator={item.attributes.operator}
                      ddd={item.attributes.ddd}
                      phoneNumber={item.attributes['phone-number']}
                      value={item.attributes.value}
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

Chip.defaultProps = {
  chip: [],
  stat: [],
};

Chip.propTypes = {
  chip: array,
  stat: array,
};

const mapStateToProps = ({ chip: { chip, getAllChip, loadedChip, loadingChip }, stat: { loadedStat, loadingStat, errorStat, stat }} ) => ({
  chip,
  getAllChip,
  loadedChip,
  loadingChip,
  stat,
  loadedStat, 
  loadingStat, 
  errorStat, 
});

export default connect(mapStateToProps, { getAllChip, getAllStat } )(Chip);
