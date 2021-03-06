import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute, ServerProtRoute } from '../util/route_util';
import SessionFormContainer from './session/session_form_container';
import SplashContainer from './splash/splash_container';
import Server from './server/server';

const App = () => (
  <Switch>
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute exact path="/login" component={SessionFormContainer} />
    <AuthRoute exact path="/register" component={SessionFormContainer} />
    <ServerProtRoute exact path="/:serverId"/>
    <ProtRoute path="/:serverId/:channelId" component={Server} />
  </Switch>
);

export default App;
