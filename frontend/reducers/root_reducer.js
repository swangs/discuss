import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';
import serverReducer from './server_reducer';
import channelReducer from './channel_reducer';
import messageReducer from './message_reducer';


const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serverReducer,
  channels: channelReducer,
  messages: messageReducer,
  errors: errorsReducer
});

export default rootReducer;
