import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import SplashContainer from './splash/splash_container';

const App = () => (
  <Fragment>
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/register" component={SessionFormContainer} />
  </Fragment>
);

export default App;
