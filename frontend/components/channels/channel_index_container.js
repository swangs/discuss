import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelIndex from './channel_index';
import { logout } from '../../actions/session_actions';
import { deleteServer } from '../../actions/server_actions';

const mapStateToProps = (state, ownProps) => ({
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  deleteServer: (serverId) => dispatch(deleteServer(serverId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex));
