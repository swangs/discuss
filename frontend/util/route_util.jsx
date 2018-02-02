import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { getServers } from '../actions/server_actions';

const mapStateToProps = (state, ownProps) => {
  let servers = ["@me"];
  if (state.session.currentUser && state.servers.servers) {
    Object.keys(state.servers.servers).map(serverId => {
      servers.push(serverId);
    });
  }
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentServer: state.servers.currentServer,
    servers,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getServers: () => dispatch(getServers()),
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

  // componentWillMount() {
  //   this.props.getServers();
  // }
  //
  // componentWillReceiveProps(newProps) {
  //   if (this.props.location !== newProps.location) {
  //     this.props.getServers();
  //   }
  // }

  render() {
    if (this.props.currentServer) {
      let route;
      if (!this.props.loggedIn) {
        route = <Redirect to="/login"/>;
      } else {
        if (this.props.servers.includes(this.props.location.pathname.slice(1))) {
          route = <this.props.component {...this.props} />;
        } else {
          route = <Redirect to="/@me" />;
        }
      }
      return (
        route
      );
    }
    return (
      <this.props.component {...this.props} />
    );
  }
}

export const ProtRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Prot));
