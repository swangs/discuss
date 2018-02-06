import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';
import serverReducer from './server_reducer';
import channelReducer from './channel_reducer';
import messageReducer from './message_reducer';
import userReducer from './user_reducer';


const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serverReducer,
  channels: channelReducer,
  messages: messageReducer,
  users: userReducer,
  errors: errorsReducer,
});

export default rootReducer;
