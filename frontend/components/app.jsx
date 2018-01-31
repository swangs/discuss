import React from 'react';
import { Route, Link } from 'react-router-dom';
import SessionFormContainer from './session/session_form_container';

const App = () => (
  <div>
    <h1>discuss</h1>
    <Link to="/login">Login</Link>
    <Route path="/login" component={SessionFormContainer} />
    <Route path="/register" component={SessionFormContainer} />
  </div>
);

export default App;
