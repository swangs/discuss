import { connect } from 'react-redux';
import { getServer } from '../../actions/server_actions';
import { withRouter } from 'react-router-dom';
import Messages from './messages';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  currentServer: state.servers.currentServer,
  currentChannel: state.channels.currentChannel,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages));
