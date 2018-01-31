import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  render() {
    let splashNav;
    if (this.props.currentUser) {
      splashNav = (
        <div className="splashNav">
          <h2>{this.props.currentUser.username}</h2>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    } else {
      splashNav = (
        <div className="splashNav">
          <Link to="/login">Login</Link>
        </div>
      );
    }

    return (
      <div id="splash">
        <h1>It's time to ditch Skype and TeamSpeak.</h1>
        {splashNav}
      </div>

    );
  }
}

export default Splash;
