import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component {

  render() {
    console.log(this.props.currentServer);
    console.log(this.props.currentUser);

    return (
      <div className="channel-index">
        <h1>{this.props.currentServer.name}</h1>
        <br></br>
        {
          this.props.currentServer.owner_id === this.props.currentUser.id ?
          <Link
            to="@me"
            onClick={() => this.props.deleteServer(this.props.location.pathname.slice(1))}>
            Delete Server
          </Link> :
          null
        }
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
