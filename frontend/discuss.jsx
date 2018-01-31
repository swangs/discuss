import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//TESTING
import { getPublicServers,
  getServer,
  postServer,
  deleteServer} from './util/server_util';
window.getPublicServers = getPublicServers;
window.getServer = getServer;
window.postServer = postServer;
window.deleteServer = deleteServer;
//TESTING

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  //TESTING
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //TESTING
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
