import React from 'react';
import { Route, Link } from 'react-router-dom';
import SessionFormContainer from './session/session_form_container';
import Header from './header/header_container';

const App = () => (
  <div>
    <Route path="/" component={Header} />
    <h1><Link to="/">discuss</Link></h1>
    <Route path="/login" component={SessionFormContainer} />
    <Route path="/register" component={SessionFormContainer} />
  </div>
);

export default App;
