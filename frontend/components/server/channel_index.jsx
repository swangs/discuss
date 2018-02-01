import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component {

  render() {
    let serverName;
    if (this.props.currentServer) {
      serverName = this.props.currentServer.name;
    }
    return (
      <div>
        <h1>{serverName}</h1>
        <ul>
          CHANNEL LIST
        </ul>
      </div>
    );
  }
}

export default ChannelIndex;
