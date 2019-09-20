import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {
  render () {
    const { newValue } = this.props;
    return (
      <container>
        <p>Home</p>
        <input type='text' />
        <button>
        click!
        </button>
        <h1>{newValue}</h1>
      </container>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue
});

export default connect(mapStateToProps)(Home);
