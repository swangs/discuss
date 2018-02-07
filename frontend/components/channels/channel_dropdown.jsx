import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class ChannelDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  deleteServer() {
    return () => this.props.deleteServer(this.props.currentServer.id)
      .then(() => this.props.getServers())
      .then(() => this.props.getServer(this.props.currentUser.myServer))
      .then(() => this.props.history.push(`/${this.props.currentUser.myServer}/${this.props.currentUser.myChannel}`));
  }

  leaveServer() {
    return () => this.props.leaveServer({
      server_id: this.props.currentServer.id,
      user_id: this.props.currentUser.id
    }).then(() => this.props.getServers())
      .then(() => this.props.getServer(this.props.currentUser.myServer))
      .then(() => {console.log("it pushes after this");})
      .then(() => this.props.history.push(`/${this.props.currentUser.myServer}/${this.props.currentUser.myChannel}`));
  }

  toggleDropdown() {
    document.getElementById("channel-dropdown").classList.toggle("show");
    document.getElementById("cog").classList.toggle("fa-spin");
    this.setState({ name: ''} );
  }

  updateNewChannel(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChatInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  handleSendEvent(event) {
    event.preventDefault();
    const serverId = this.props.currentServer.id;
    let channel;
    this.props.postChannel(serverId, this.state)
      .then(response => {channel = response.currentChannel; })
      .then(() => this.props.getServers())
      .then(() => this.props.getServer(`${serverId}`))
      .then(() => this.props.getChannel(channel.id))
      .then(() => this.props.history.push(`/${serverId}/${channel.id}`))
      .then(() => this.toggleDropdown());
  }

  render() {

    let leaveServer = (
        <button
          className="remove-server-button"
          onClick={this.leaveServer()}>
          Leave Server
        </button>
      );

    let deleteServer = null;
    if (this.props.currentServer.owner_id === this.props.currentUser.id) {
      deleteServer = (
        <button
          className="remove-server-button"
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
              autoFocus
              type="text"
              className="add-channel-input"
              placeholder="Create Channel"
              value={ this.state.name }
              onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
              onChange={ (e) => this.updateNewChannel(e) }>
            </input>
            { leaveServer }
            { deleteServer }
          </div>
        </div>
      );
    }
  }

}

export default ChannelDropdown;
