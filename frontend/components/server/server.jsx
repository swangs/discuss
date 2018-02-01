import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../../util/route_util';
import ServerIndexContainer from './server_index_container';
import ChannelIndexContainer from './channel_index_container';

const Server = () => (
  <Fragment>
    SERVER MENU
    <ServerIndexContainer />
    <ChannelIndexContainer />
  </Fragment>
);

export default Server;
