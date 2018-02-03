import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class ChannelIndex extends React.Component {

  deleteServer() {
    return () => this.props.deleteServer(this.props.location.pathname.slice(1))
      .then(() => this.props.history.push(`/@me`));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname === "/@me" ?
        newProps.currentUser.myServer :
        newProps.location.pathname.slice(1);
      this.props.getServer(serverId);
    }
  }



  render() {
    let deleteButton = null;
    if (this.props.location.pathname === "/@me") {
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
          to={`/${this.props.currentServer.id}/ ${channel.id}`}>
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
