import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Messages from './messages';
import { getServer } from '../../actions/server_actions';
import { getChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  currentServer: state.servers.currentServer,
  currentChannel: state.channels.currentChannel,
});

const mapDispatchToProps = dispatch => ({
  getServer: (serverId) => dispatch(getServer(serverId)),
  getChannel: (channelId) => dispatch(getChannel(channelId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages));
