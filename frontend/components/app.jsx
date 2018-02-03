import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import SplashContainer from './splash/splash_container';
import Server from './server/server';

const App = () => (
  <Switch>
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/register" component={SessionFormContainer} />
    <ProtRoute exact path="/:serverId" component={Server} />
    <ProtRoute path="/:serverId/:channelId" component={Server} />
  </Switch>
);

export default App;
