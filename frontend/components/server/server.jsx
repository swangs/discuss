import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../../util/route_util';
import ServerIndexContainer from './server_index_container';

const Server = () => (
  <Fragment>
    <ServerIndexContainer />
  </Fragment>
);

export default Server;
