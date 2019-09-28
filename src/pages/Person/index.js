import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPerson } from '../../store/modules/getPerson';
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

class Person extends Component{
  componentDidMount() {
    this.props.getAllPerson();
  }
  render()
  {
    const { person, loaded, loading } = this.props;
    console.log(loaded);
    console.log(loading);

    return (
      <Fragment>
        {
          loading ? 
            (
              <Loader />
            ) :
            (
              <StyledListBox>
                {
                  person.map((item) => (
                    <PersonCard 
                      key={item.id}
                      id={item.id}
                      name={item.attributes.name} 
                      cpf={item.attributes.cpf} 
                      company_name={item.attributes.company.name}
                      sector_name={item.attributes.sector.name}
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
};

Person.propTypes = {
  person: array,
};

const mapStateToProps = ({ person: { person, getAllPerson, loaded, loading } }) => ({
  person,
  getAllPerson,
  loaded,
  loading,
});

export default connect(mapStateToProps, { getAllPerson } )(Person);
