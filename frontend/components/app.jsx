import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import Header from './header/header_container';

const App = () => (
  <div>
    <Route exact path="/" component={Header} />
    <h1><Link to="/">discuss</Link></h1>
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/register" component={SessionFormContainer} />
  </div>
);

export default App;
