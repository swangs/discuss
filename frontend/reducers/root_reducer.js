import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';
import serverReducer from './server_reducer';


const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serverReducer,
  errors: errorsReducer
});

export default rootReducer;
