import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ChannelDropdownContainer from './channel_dropdown_container';


class ChannelIndex extends React.Component {

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

    let channelList;
    if (this.props.currentServer.channels) {
      if (this.props.currentServer.id === this.props.currentUser.myServer) {
        channelList = this.props.currentServer.channels.map(channel => (
          <NavLink
            key={channel.id}
            className="channel-button"
            to={`/@me/${channel.id}`}>
            <i className="fas fa-hashtag"></i> {channel.name}
            </NavLink>
          ));
      } else {
        channelList = this.props.currentServer.channels.map(channel => (
          <NavLink
            key={channel.id}
            className="channel-button"
            to={`/${this.props.currentServer.id}/${channel.id}`}>
            <i className="fas fa-hashtag"></i> {channel.name}
            </NavLink>
          ));
      }
    }

    window.onclick = function(event) {
      // console.log(!event.target.matches('.dropdown'));
      if (!event.target.matches('.dropdown')
        && !event.target.matches('.dropdown-p')
        && !event.target.matches('.fa-cog')
        && !event.target.matches('.add-channel-input')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
        let cog = document.getElementsByClassName("fa-cog");
        for (var j = 0; j < cog.length; j++) {
          let spinningCog = cog[j];
          if (spinningCog.classList.contains('fa-spin')) {
            spinningCog.classList.remove('fa-spin');
          }
        }
      }
    };

    return (
      <div className="channel-index">
        <ChannelDropdownContainer />
        <ul className="channel-list">
          {channelList}
        </ul>
        <div className="user-info">
          <p>{this.props.currentUser.username}</p>
          <Link className='logout' to='/' onClick={this.props.logout}>Logout</Link>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
