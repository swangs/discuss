import { connect } from 'react-redux';
import { signUp, signIn } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  let formType = ownProps.location.pathname.slice(1);
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors,
    formType
  };
};

const mapDispatchToProps = (state, ownProps) => {
  let submitForm = ownProps.location.pathname === '/login' ? signIn : signUp;
  return {
    submitForm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
