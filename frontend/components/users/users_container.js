import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Users from './users';

const mapStateToProps = (state, ownProps) => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Users));
