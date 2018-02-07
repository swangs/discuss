import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Users from './users';
import { postChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  users: state.users,
  currentUser: state.session.currentUser,
  errors: state.errors.channel,
});

const mapDispatchToProps = dispatch => ({
  postChannel: (serverId, channelInfo) => dispatch(postChannel(serverId, channelInfo)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Users));
