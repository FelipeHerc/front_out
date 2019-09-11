import React, { Fragment } from 'react';
import Header from '../Header'
// import { withRouter } from 'react-router-dom';
// import { object } from 'prop-types';
// import locale from 'locales';
// import config from 'utils/config';
import { Routes } from '../../utils/routes';
import { withRouter } from 'react-router-dom';

const Root = () => {

  return (
    <Fragment>
      <Header />
      <Routes />
    </Fragment>
  );
};

export default withRouter(Root);