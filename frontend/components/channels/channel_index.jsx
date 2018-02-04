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

    return (
      <div className="channel-index">
        <h1>{this.props.currentServer.name}</h1>
        <br></br>
        {deleteButton}
        <br></br>
        <br></br>
        <ul>
          {channelList}
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
