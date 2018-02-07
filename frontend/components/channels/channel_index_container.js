import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelIndex from './channel_index';
import { logout } from '../../actions/session_actions';
import {
  getServers,
  getServer,
  deleteServer
} from '../../actions/server_actions';
import { getChannel,
  postChannel,
  deleteChannel
} from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  currentServer: state.servers.currentServer,
  currentChannel: state.channels.currentChannel,
  channels: state.channels.channels,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getServers: () => dispatch(getServers()),
  getServer: (serverId) => dispatch(getServer(serverId)),
  deleteServer: (serverId) => dispatch(deleteServer(serverId)),
  getChannel: (channelId) => dispatch(getChannel(channelId)),
  postChannel: (serverId, channel) => dispatch(postChannel(serverId, channel)),
  deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex));
