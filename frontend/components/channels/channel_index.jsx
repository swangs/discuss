import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component {

  deleteServer() {
    return () => this.props.deleteServer(this.props.location.pathname.slice(1))
      .then(() => this.props.getServers());
  }

  render() {
    let deleteButton = (
      <button
        onClick={this.deleteServer()}>
        Delete Server
      </button>
    );

    if (this.props.currentServer.owner_id !== this.props.currentUser.id || this.props.location.pathname === "/@me") {
      deleteButton = null;
    }

    return (
      <div className="channel-index">
        <h1>{this.props.currentServer.name}</h1>
        <br></br>
        {deleteButton}
        <ul>
        </ul>
        <br/><br/>
        <h1>{this.props.currentUser.username}</h1>
        <br></br>
        <Link to='/' onClick={this.props.logout}>Logout</Link>

      </div>
    );
  }
}

export default ChannelIndex;
