import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import config from 'utils/config';
import { Root } from '../index';
// import store from 'store/storeSetup';

export const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.Fragment>
  );
};
