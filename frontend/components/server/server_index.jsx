import React from 'react';
import { Link } from 'react-router-dom';
import AddServer from './add_server';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  componentWillMount() {
    this.props.getServers();
    let serverId = this.props.location.pathname === "/@me" ?
      this.props.currentUser.myServer :
      this.props.location.pathname.slice(1);
    this.props.getServer(serverId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname === "/@me" ?
        newProps.currentUser.myServer :
        newProps.location.pathname.slice(1);
      this.props.getServer(serverId);
    }
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = Object.values(this.props.servers).map(server => (
        <Link
          key={server.id}
          className="server-button"
          to={`/${server.id}`}>
          {server.name[0]}
        </Link>
      ));
    }

    return (
      <div className="server-index">
        <Link className="me-button" to="/@me">@me</Link>
        <div className="divider"></div>
        {serverList}
        <Link
          onClick={() => this.openModal()}
          className="add-server"
          to={this.props.location.pathname}>
          +
        </Link>
        <AddServer
          errors={this.props.errors}
          postServer={this.props.postServer}
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}
          />
      </div>
    );
  }

}

export default ServerIndex;
