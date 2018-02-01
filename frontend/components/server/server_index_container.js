import { connect } from 'react-redux';
import {
  getServers,
  getServer,
  postServer
 } from '../../actions/server_actions';
import { withRouter } from 'react-router-dom';
import ServerIndex from './server_index';

const mapStateToProps = (state, ownProps) => ({
  servers: state.servers.servers,
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser,
  errors: state.errors.server
});

const mapDispatchToProps = dispatch => ({
  getServers: () => dispatch(getServers()),
  getServer: (serverId) => dispatch(getServer(serverId)),
  postServer: (formServer) => dispatch(postServer(formServer))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerIndex));
