import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  render() {
    let splashDetails;
    if (this.props.currentUser) {
      splashDetails = (
        <div>
          <h2>{this.props.currentUser.username}</h2>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    } else {
      splashDetails = (
        <div>
          <Link to="/login">Login</Link>
        </div>
      );
    }

    return (
      <div id="splash">
        <h1>It's time to ditch Skype and TeamSpeak.</h1>
        {splashDetails}
      </div>

    );
  }
}

export default Splash;
