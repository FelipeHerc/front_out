import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, Equips, Home, Person, Notebook, Cel, Chip } from '../pages';
// import config from 'utils/config';

export const Routes = () => (
  <Switch>
    <Route exact path="/notebook" component={Notebook} />
    <Route exact path="/chips" component={Chip} />
    <Route exact path="/equips" component={Equips} />
    <Route exact path="/cels" component={Cel} />
    <Route exact path="/" component={Home} />
    <Route exact path="/person" component={Person} />
    {/* <Route exact path="/processos-seletivos" component={Vacancies} />
    <Route exact path="/introducao-assistente" component={Intro} />
    <Route path="/processos-seletivos/:processoSeletivoId/cadastrar" component={SelectiveProcessForm} /> */}
    <Route component={NotFound} />
  </Switch>
);
