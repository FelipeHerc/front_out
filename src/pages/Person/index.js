import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPerson } from '../../store/modules/getPerson';
import { getAllCompany } from '../../store/modules/getCompany';
import { getAllSector } from '../../store/modules/getSector';
import { getAllCity } from '../../store/modules/getCity';
import { array } from 'prop-types';
import { PersonCard, Loader, CreateOrUpdatePerson } from '../../components'
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';

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
    this.props.getAllCity();
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
    const { person, company, sector, city, loadingCity, loadingPerson, loadingCompany, loadingSector } = this.props;

    return (
      <Fragment>
        {
          (loadingPerson || loadingCompany || loadingSector || loadingCity) ? 
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
                  <Modal open={Boolean(open)} onClose={this.onCloseModal} onExited={() => this.props.getAllPerson()} center focusTrapped={false}>
                    <CreateOrUpdatePerson isEditing={false} label="Criar funcionário" companyList={company} sectorList={sector} cityList={city}/>
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
                      city={item.attributes.city.id}
                      city_name={item.attributes.city.name}
                      companyList={company} 
                      sectorList={sector}
                      cityList={city}
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
    person: { person, getAllPerson, loadedPerson, loadingPerson }, 
    company: { company, getAllCompany, loadedCompany, loadingCompany },
    sector: { sector, getAllSector, loadedSector, loadingSector },
    city: { city, getAllCity, loadedCity, loadingCity },
  }) => ({
  person,
  getAllPerson,
  loadedPerson,
  loadingPerson,
  company, 
  getAllCompany, 
  loadedCompany, 
  loadingCompany,
  sector, 
  getAllSector, 
  loadedSector, 
  loadingSector,
  city, 
  getAllCity, 
  loadedCity, 
  loadingCity,
});

export default connect(mapStateToProps, { getAllPerson, getAllCompany, getAllSector, getAllCity } )(Person);
