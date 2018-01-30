import React from 'react';
import ReactDOM from 'react-dom';


// TESTING
import * as SessionApi from "./util/session_util";
window.signUp = SessionApi.signUp;
window.signIn = SessionApi.signIn;
window.signOut = SessionApi.signOut;





//TESTING

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>DISCUSS</h1>, root);
});
