import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndex extends React.Component {

  componentWillMount() {
    this.props.getServers();
    let serverId = this.props.location.pathname === "/@me" ?
      this.props.currentUser.id :
      this.props.location.pathname.slice(1);
    this.props.getServer(serverId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname.slice(1);
      this.props.getServer(serverId);
    }
  }

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = Object.values(this.props.servers).map(server => (
        <Link className="server-button" to={`/${server.id}`}>{server.name[0]}</Link>
      ));
    }

    return (
      <div className="server-index">
        <Link className="me-button" to="/@me">@me</Link>
        <div className="divider"></div>
        {serverList}
      </div>
    );
  }

}

export default ServerIndex;
