import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  let servers = ["@me"];
  if (state.session.currentUser && state.servers.servers) {
    Object.keys(state.servers.servers).map(serverId => {
      servers.push(serverId);
    });
  }
  return {
    loggedIn: Boolean(state.session.currentUser),
    servers,
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

  render() {
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
}

export const ProtRoute = withRouter(connect(mapStateToProps)(Prot));
