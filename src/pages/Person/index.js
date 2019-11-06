import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPerson } from '../../store/modules/getPerson';
import { getAllCompany } from '../../store/modules/getCompany';
import { getAllSector } from '../../store/modules/getSector';
import { array } from 'prop-types';
import { PersonCard, Loader, CreateOrUpdatePerson } from '../../components'
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

const Row = styled.div`
    display: flex;    
    flex-direction: row;
    justify-content: space-between;
`;

const H2 = styled.h2`
  margin: 10px 0px 10px 20px;
`;

class Person extends Component{
  constructor() {
    super();

    this.state = {
      open: false
    }
  }

  componentDidMount() {
    this.props.getAllPerson();
    this.props.getAllCompany();
    this.props.getAllSector();
  }
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
  
  onCloseModal = () => {
    this.setState({ open: false });
  };
  
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
    const { person, company, sector, loading, loadingCompany, loadingSector } = this.props;

    return (
      <Fragment>
        {
          (loading || loadingCompany || loadingSector) ? 
            (
              <Loader />
            ) :
            (
              <StyledListBox>
                <Row>
                  <H2>Funcionários</H2>
                  <ButtonBox>
                    <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={this.onOpenModal}>
                      Criar novo funcionário
                    </Button>
                  </ButtonBox>
                  <Modal open={open} onClose={this.onCloseModal} onExited={() => this.props.getAllPerson()} center>
                    <CreateOrUpdatePerson isEditing={false} label="Criar funcionário" companyList={company} sectorList={sector}/>
                  </Modal>
                </Row>
                {
                  person.map((item) => (
                    <PersonCard 
                      key={item.id}
                      id={item.id}
                      name={item.attributes.name} 
                      cpf={item.attributes.cpf} 
                      email={item.attributes.email}
                      company_name={item.attributes.company.name}
                      sector_name={item.attributes.sector.name}
                      company={item.attributes.company.id}
                      sector={item.attributes.sector.id}
                      companyList={company} 
                      sectorList={sector}
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

Person.defaultProps = {
  person: [],
  sector: [],
  company: []
};

Person.propTypes = {
  person: array,
  sector: array,
  company: array,
};

const mapStateToProps = (
  { 
    person: { person, getAllPerson, loaded, loading }, 
    company: { company, getAllCompany, loadedCompany, loadingCompany },
    sector: { sector, getAllSector, loadedSector, loadingSector },
  }) => ({
  person,
  getAllPerson,
  loaded,
  loading,
  company, 
  getAllCompany, 
  loadedCompany, 
  loadingCompany,
  sector, 
  getAllSector, 
  loadedSector, 
  loadingSector
});

export default connect(mapStateToProps, { getAllPerson, getAllCompany, getAllSector } )(Person);
