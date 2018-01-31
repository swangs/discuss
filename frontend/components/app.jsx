import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from './session/session_form_container';

const App = () => (
  <div>
    <h1>DiscussApp</h1>
    <Route path="/login" component={SessionFormContainer} />
    <Route path="/register" component={SessionFormContainer} />
  </div>
);

export default App;
