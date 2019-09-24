import React, { Component } from 'react';
import { connect } from 'react-redux';
import { funct } from '../../store/modules/getPerson';
class Person extends Component{
  render()
  {
    this.props.funct();
    console.log(this.props.person);
    return (
      <div>
        <p>a</p>
      </div>
      )
  }
}

const mapStateToProps = ({ person: { person, funct } }) => ({
  person,
});

export default connect(mapStateToProps, { funct } )(Person);
