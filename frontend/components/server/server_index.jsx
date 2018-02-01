import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndex extends React.Component {

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    console.log(this.props);
    let serverList;
    if (this.props.servers) {
      serverList = Object.values(this.props.servers).map(server => (
        <li key={`${server.id}`}>
          <Link to={`/${server.id}`}>{server.name[0]}</Link>
        </li>
      ));
    }

    return (
      <ul>
        <Link to="/@me">@me</Link>
        {serverList}
      </ul>
    );
  }

}

export default ServerIndex;
