import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelDropdown from './channel_dropdown';
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
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
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
)(ChannelDropdown));
