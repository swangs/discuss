import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtRoute } from '../../util/route_util';
import ServerIndexContainer from './server_index_container';
import ChannelIndexContainer from './channel_index_container';
import MessagesContainer from './messages_container';

const Server = () => (
  <div className="discuss-main">
    <ServerIndexContainer />
    <ChannelIndexContainer />
    <MessagesContainer />
  </div>
);

export default Server;
