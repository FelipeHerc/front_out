import React, { Fragment } from 'react';
/* import Header from '../Header' */
// import { withRouter } from 'react-router-dom';
// import { object } from 'prop-types';
// import locale from 'locales';
// import config from 'utils/config';
import { Routes } from '../../utils/routes';
import { withRouter } from 'react-router-dom';
import { Side } from '../../components';
import StickyBox from "react-sticky-box";
import { Login } from '../../pages';

const logged = () => {
  if (localStorage.getItem('user-token') && localStorage.getItem('user-email'))
    return true;

  return false;
}

const Root = () => {
  return (
    <Fragment>
      {
        logged() &&
        <StickyBox offsetTop={20} offsetBottom={20}>
          <Side />
        </StickyBox>
      }
      {
        logged() &&
        <Routes />
      }
      {
        !logged() &&
        <Login />
      }
    </Fragment>
  );
};

export default withRouter(Root);
