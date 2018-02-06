import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Messages from './messages';
import { getServer } from '../../actions/server_actions';
import { getChannels, getChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  let channels = [];
  if (state.channels.channels) {
    state.channels.channels.map(channel => {
      channels.push(channel.id);
    });
  }
  return {
    currentUser: state.session.currentUser,
    currentServer: state.servers.currentServer,
    currentChannel: state.channels.currentChannel,
    messages: state.messages.messages,
    channels,
  };
};

const mapDispatchToProps = dispatch => ({
  getServer: (serverId) => dispatch(getServer(serverId)),
  getChannels: (serverId) => dispatch(getChannels(serverId)),
  getChannel: (channelId) => dispatch(getChannel(channelId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages));
