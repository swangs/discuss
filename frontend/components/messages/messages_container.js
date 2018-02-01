import { connect } from 'react-redux';
import { getServer } from '../../actions/server_actions';
import { withRouter } from 'react-router-dom';
import Messages from './messages';

const mapStateToProps = (state, ownProps) => ({
  currentServer: state.servers.currentServer,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages));
