import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  render() {
    let splashSession;
    if (this.props.currentUser) {
      splashSession = (
        <div className="splash-session">
          <h2>Welcome, {this.props.currentUser.username}.</h2>
          <Link to='/' onClick={this.props.logout}>Logout</Link>
          <Link to="/@me">Open</Link>
        </div>
      );
    } else {
      splashSession = (
        <div className="splash-session">
          <Link to="/login">Login</Link>
        </div>
      );
    }

    return (
      <div id="splash">
        <div className='nav'>
          {splashSession}
          <div className='splash-nav-left'>
            <div className='splash-logo'></div>
            <h1>ĐISCUSS</h1>
          </div>
        </div>
        <div className='splash-text'>
          <h1 className='splash-h1'>It's time to ditch Discord, Skype, and TeamSpeak.</h1>
          <p className="splash-p">A live chat app cloned from Discord, Discuss is built with React-Redux frontend and Rails backend. Seamlessly chat in real time with group or private channels.</p>
        </div>
      </div>

    );
  }
}

export default Splash;
