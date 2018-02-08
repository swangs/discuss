import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { getServers, getServer } from '../actions/server_actions';
import { getChannels, getChannel } from '../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  let servers = [];
  if (state.session.currentUser && state.servers.servers) {
    Object.keys(state.servers.servers).map(serverId => {
      servers.push(parseInt(serverId));
    });
  }
  let channels = [];
  if (state.channels.channels) {
    state.channels.channels.map(channel => {
      channels.push(channel.id);
    });
  }
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    currentServer: state.servers.currentServer,
    currentChannel: state.channels.currentChannel,
    servers,
    channels,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getServers: () => dispatch(getServers()),
    getServer: (serverId) => dispatch(getServer(serverId)),
    getChannels: (serverId) => dispatch(getChannels(serverId)),
    getChannel: (channelId) => dispatch(getChannel(channelId)),
  };
};

const Auth = ({ loggedIn, path, exact, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      loggedIn ? <Redirect to="/@me/" /> : <Component {...props} />
    )}
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

// const Prot = ({ loggedIn, path, exact, component: Component }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={props => (
//       !loggedIn ? <Redirect to="/login" /> : <Component {...props} />
//     )}
//   />
// );

class Prot extends React.Component {

  constructor(props) {
    super(props);

    const LOADINGLINES = [
      "Neutralizing Enemy Systems",
      "Preparing Defenses",
      "Reaching the Checkpoint",
      "Activating Defense Matrix",
      "Opening the path",
      "Some assembly required",
      "Waiting around",
      "Once more into the breach",
      "Stretching before rigorous activity",
      "Traveling to...",
      "Experiencing Tranquility",
      "Cheers love, the servers are here!",
      "Caaan do!",
      "lawk...",
      "sheuuups",
      "preparing big blasties",
    ];

    this.state = {
      loading: true,
      loadingLine: LOADINGLINES[Math.floor(Math.random()*LOADINGLINES.length)],
      errors: false,
     };
  }



  componentWillMount() {
    let serverId = this.props.location.pathname;
    serverId = serverId.slice(1);
    let index = serverId.indexOf('/');
    if (index < 0) {
      index = serverId.length;
    }
    let channelId = serverId.slice(index + 1);
    serverId = serverId.slice(0, index);
    this.props.getServers()
      .then(() => {
        serverId = this.props.location.pathname.slice(0, 4).includes("/@me") ?
          this.props.currentUser.myServer :
          serverId;
      })
      .then(() => this.props.getServer(serverId))
      // .then(() => this.props.getChannels(serverId))
      .then(() => this.props.getChannel(channelId))
      .then(
        () => {setTimeout(() => this.setState({ loading: false, errors: false }), 2000);},
        error => this.setState({ loading: false, errors: true} )
      );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname;
      serverId = serverId.slice(1);
      let index = serverId.indexOf('/');
      if (index < 0) {
        index = serverId.length;
      }
      let channelId = serverId.slice(index + 1);
      serverId = serverId.slice(0, index);
    //   newProps.getServers()
    //   .then(() => {
        // serverId = newProps.location.pathname.slice(0, 4).includes("/@me") ?
        // newProps.currentUser.myServer :
        // serverId;
    //   })
    //   .then(() => newProps.getServer(serverId))
    //   .then(() => newProps.getChannels(serverId))
    //   .then(() => newProps.getChannel(channelId))
      // .then(() => this.setState({ loading: false, errors: false }),
      //   error => this.setState({ loading: false, errors: true} ));
    // }

    serverId = newProps.location.pathname.slice(0, 4).includes("/@me") ?
    newProps.currentUser.myServer :
    serverId;
     newProps.getServer(serverId)
     .then(() => newProps.getChannel(channelId))
     .then(() => this.setState({ loading: false, errors: false }),
       error => this.setState({ loading: false, errors: true} ));
     }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login"/>;
    }

    if (this.state.loading) {
      return (
        <div className="loader-background">
          <h1 className="loader-text">
            { this.state.loadingLine }
          </h1>
          <div className="loader">
          </div>
        </div>
      );
    }

    if (this.state.errors) {
      return <Redirect to="/login"/>;
    }

    let route;
    let servers = this.props.servers;
    this.props.servers.push(this.props.currentUser.myServer);
    if (servers.includes(this.props.currentServer.id) || !this.props.channels.includes(this.props.currentChannel.id)) {
      route = <this.props.component {...this.props} />;
    } else {
      route = <Redirect to={`/@me/${this.props.currentUser.myChannel}`} />;
    }

    return route;
  }
}

export const ProtRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Prot));

class ServerProt extends React.Component {

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login"/>;
    } else {
      return <Redirect to={`/@me/${this.props.currentUser.myChannel}`} />;
    }
  }
}

export const ServerProtRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerProt));
