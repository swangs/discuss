import { connect } from 'react-redux';
import { register, login, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  let formType = ownProps.location.pathname.slice(1);
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const submitForm = ownProps.location.pathname === '/login' ? login : register;
  return {
    clearErrors: () => dispatch(clearErrors()),
    submitForm: formUser => dispatch(submitForm(formUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
