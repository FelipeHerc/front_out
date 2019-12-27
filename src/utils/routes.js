import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, Equips, Home, Person, Notebook, Cel, Chip, Ownerships } from '../pages';
// import config from 'utils/config';

export const Routes = () => (
    <Switch>
      <Route exact path="/notebooks" component={Notebook} />
      <Route exact path="/chips" component={Chip} />
      <Route exact path="/equips" component={Equips} />
      <Route exact path="/cels" component={Cel} />
      <Route exact path="/persons" component={Person} />
      <Route exact path="/ownerships" component={Ownerships} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
);
