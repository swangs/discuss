import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class ChannelDropdown extends React.Component {

  deleteServer() {
    return () => this.props.deleteServer(this.props.currentServer.id)
      .then(() => this.props.getServers())
      .then(() => this.props.getServer(this.props.currentUser.myServer))
      .then(() => this.props.history.push(`/${this.props.currentUser.myServer}/${this.props.currentUser.myChannel}`));
  }

  toggleDropdown() {

    document.getElementById("channel-dropdown").classList.toggle("show");
    document.getElementById("cog").classList.toggle("fa-spin");
  }

  render() {

    let deleteButton = null;
    if (this.props.currentServer.owner_id === this.props.currentUser.id) {
      deleteButton = (
        <button
          className="delete-server-button"
          onClick={this.deleteServer()}>
          Delete Server
        </button>
      );
    }

    if (this.props.currentServer.id === this.props.currentUser.myServer) {
      return (
        <div className="user-header">
          <p>
            {`Welcome, ${this.props.currentUser.username}`}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <div
            onClick={() => this.toggleDropdown()}
            className="dropdown">
            <p className="dropdown-p">{this.props.currentServer.name}</p>
            <i id="cog" className="fas fa-cog"></i>
          </div>
          <div id="channel-dropdown" className="dropdown-content">
            <p>Server Options</p>
            <input
              className="add-channel-input"
              placeholder="Add Channel">
            </input>
            {deleteButton}
          </div>
        </div>
      );
    }
  }

}

export default ChannelDropdown;
