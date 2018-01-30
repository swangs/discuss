import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import * as SessionApi from "./util/session_util";


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // TESTING
  window.signUp = SessionApi.signUp;
  window.signIn = SessionApi.signIn;
  window.signOut = SessionApi.signOut;
  window.store = store;
  //TESTING
  
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
