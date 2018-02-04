import React from 'react';
import { Link, NavLink } from 'react-router-dom';


class ChannelIndex extends React.Component {

  deleteServer() {
    return () => this.props.deleteServer(this.props.currentServer.id)
      .then(() => this.props.getServers())
      .then(() => this.props.getServer(this.props.currentUser.myServer))
      .then(() => this.props.history.push(`/${this.props.currentUser.myServer}/${this.props.currentUser.myChannel}`));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname;
      serverId = serverId.slice(1);
      let index = serverId.indexOf('/');
      if (index < 0) {
        index = serverId.length;
      }
      let channelId = serverId.slice(index + 1);
      serverId = serverId.slice(0, index);
      serverId = newProps.location.pathname.includes("/@me") ?
        newProps.currentUser.myServer :
        serverId;
      this.props.getServer(serverId);
      this.props.getChannel(channelId);
    }
  }

  toggleDropdown() {
    document.getElementById("channel-dropdown").classList.toggle("show");
  }

  render() {
    let deleteButton = null;
    if (this.props.currentServer.id === this.props.currentUser.myServer) {
      deleteButton = null;
    } else if (this.props.currentServer.owner_id === this.props.currentUser.id) {
      deleteButton = (
        <button
          className="delete-server-button"
          onClick={this.deleteServer()}>
          Delete Server
        </button>
      );
    }

    let channelList;
    if (this.props.currentServer.channels) {
      channelList = this.props.currentServer.channels.map(channel => (
        <NavLink
          key={channel.id}
          className="channel-button"
          to={`/${this.props.currentServer.id}/${channel.id}`}>
          {channel.name}
        </NavLink>
      ));
    }

    window.onclick = function(event) {
      if (!event.target.matches('.dropdown')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };

    return (
      <div className="channel-index">

        <div
          onClick={() => this.toggleDropdown()}
          className="dropdown">
            <p>{this.props.currentServer.name}</p>
            <p>+</p>
          <div id="channel-dropdown" className="dropdown-content">
            <p>Options</p>
            {deleteButton}
          </div>
        </div>


        <ul className="channel-list">
          {channelList}
        </ul>

        <div className="user-info">
          <p>{this.props.currentUser.username}</p>
          <Link to='/' onClick={this.props.logout}>Logout</Link>
        </div>

      </div>
    );
  }
}

export default ChannelIndex;
