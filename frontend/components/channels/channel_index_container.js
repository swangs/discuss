import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelIndex from './channel_index';
import { logout } from '../../actions/session_actions';
import { getServers, getServer, deleteServer } from '../../actions/server_actions';
import { getChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getServers: () => dispatch(getServers()),
  getServer: (serverId) => dispatch(getServer(serverId)),
  deleteServer: (serverId) => dispatch(deleteServer(serverId)),
  getChannel: (channelId) => dispatch(getChannel(channelId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex));
