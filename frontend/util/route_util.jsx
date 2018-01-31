import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

const Auth = ({ loggedIn, path, exact, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      loggedIn ? <Redirect to="/" /> : <Component {...props} />
    )}
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

const Prot = ({ loggedIn, path, exact, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      !loggedIn ? <Redirect to="/login" /> : <Component {...props} />
    )}
  />
);

export const ProtRoute = withRouter(connect(mapStateToProps)(Prot));
