import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component {

  render() {
    let serverName;
    if (this.props.currentServer) {
      serverName = this.props.currentServer.name;
    }
    return (
      <div className="channel-index">
        <h1>{serverName}</h1>
        <ul>
          CHANNEL LIST NOT MADE YET
        </ul>
        <br/><br/>
        <Link to='/' onClick={this.props.logout}>Logout</Link>

      </div>
    );
  }
}

export default ChannelIndex;
