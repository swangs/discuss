import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserAvatar from './user_avatar';
import { updateUser } from '../../actions/session_actions';
import { getChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  imageUrl: state.session.currentUser.image_url,
  currentChannel: state.channels.currentChannel.id,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (formData) => dispatch(updateUser(formData)),
  getChannel: (channelId) => dispatch(getChannel(channelId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatar));
