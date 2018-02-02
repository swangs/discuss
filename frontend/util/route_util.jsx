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

    this.state = { loading: true };
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
      .then(() => (this.setState({ loading : false })));
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login"/>;
    }

    if (this.state.loading) {
      return (
        <div className="loader-background">
          <div className="loader">Loading...</div>
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
