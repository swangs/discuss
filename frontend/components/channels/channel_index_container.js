import { connect } from 'react-redux';
import { getServer } from '../../actions/server_actions';
import { withRouter } from 'react-router-dom';
import ChannelIndex from './channel_index';

const mapStateToProps = (state, ownProps) => ({
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  getServer: (serverId) => dispatch(getServer(serverId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex));
