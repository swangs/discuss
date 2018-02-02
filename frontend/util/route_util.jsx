import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { getServers, getServer } from '../actions/server_actions';

const mapStateToProps = (state, ownProps) => {
  let servers = ["@me"];
  if (state.session.currentUser && state.servers.servers) {
    Object.keys(state.servers.servers).map(serverId => {
      servers.push(serverId);
    });
  }
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    currentServer: state.servers.currentServer,
    servers,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getServers: () => dispatch(getServers()),
    getServer: (serverId) => dispatch(getServer(serverId)),
  };
};

const Auth = ({ loggedIn, path, exact, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      loggedIn ? <Redirect to="/@me" /> : <Component {...props} />
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
      "Returning Discuss Orb",
      "Neutralizing Enemy Systems",
      "Preparing Defenses",
      "Reaching the Checkpoint",
      "Sating the Dragon",
      "Activating Defense Matrix",
      "Opening the path",
      "Some assembly required",
      "Waiting around",
      "Once more into the breach",
      "Stretching before rigorous activity",
      "Repositioning",
      "Traveling to...",
      "Roses are red violets are blue Ryuu ga waga teki wo kurau!",
      "Experiencing Tranquility",
      "Cheers love, the servers are here!",
      "lawk...",
      "sheuuups",
    ];

    this.state = {
      loading: true,
      loadingLine: LOADINGLINES[Math.floor(Math.random()*LOADINGLINES.length)]
     };
  }



  componentWillMount() {
    let serverId;
    this.props.getServers()
      .then(() => {
        serverId = this.props.location.pathname === "/@me" ?
          this.props.currentUser.myServer :
          this.props.location.pathname.slice(1);
      })
      .then(() => this.props.getServer(serverId))
      .then(() => {
        setTimeout(() => this.setState({ loading : false }), 2000);
      });
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

    let route;
    if (this.props.servers.includes(this.props.location.pathname.slice(1))) {
      route = <this.props.component {...this.props} />;
    } else {
      route = <Redirect to="/@me" />;
    }
    return route;
  }
}

export const ProtRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Prot));
