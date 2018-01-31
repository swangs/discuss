import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Header from './header/header_container';

const App = () => (
  <Fragment>
    <Route exact path="/" component={Header} />
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/register" component={SessionFormContainer} />
  </Fragment>
);

export default App;
