import { connect } from 'react-redux';
import {
  postServer,
  joinServer
 } from '../../actions/server_actions';
import { withRouter } from 'react-router-dom';
import AddServer from './add_server';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.server
});

const mapDispatchToProps = dispatch => ({
  postServer: (formServer) => dispatch(postServer(formServer)),
  joinServer: (serverName) => dispatch(joinServer(serverName)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServer));
