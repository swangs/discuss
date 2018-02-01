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

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = Object.values(this.props.servers).map(server => (
        <li key={`${server.id}`}>
          <Link to={`/${server.id}`}>{server.name[0]}</Link>
        </li>
      ));
    }

    return (
      <div className="server-index">
        <ul>
          <Link to="/@me">@me</Link>
          {serverList}
        </ul>
      </div>
    );
  }

}

export default ServerIndex;
