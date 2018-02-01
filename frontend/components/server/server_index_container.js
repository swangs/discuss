import { connect } from 'react-redux';
import { getServers } from '../../actions/server_actions';
import ServerIndex from './server_index';

const mapStateToProps = (state, ownProps) => ({
  servers: state.servers.servers
});

const mapDispatchToProps = dispatch => ({
  getServers: () => dispatch(getServers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerIndex);
