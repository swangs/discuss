import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AddServerContainer from './add_server_container';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.props.getServers();
    }
  }

  openModal() {
    this.setState({ isModalOpen: true });
    this.props.clearErrors();
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = Object.values(this.props.servers).map(server => {
        let navClass = "server-button";
        if (this.props.location.pathname.includes(`/${server.id}/`)) {
          navClass = "server-button active";
        }
        return (
          <Link
            key={server.id}
            className={navClass}
            to={`/${server.id}/${server.channels[0].id}`}>
            {server.name[0]}
          </Link>
        );
      });
    }

    let navClass = "me-button server-button";
    if (this.props.location.pathname.includes(`/@me/`) || this.props.location.pathname.includes(`/${this.props.currentUser.myServer}/`)) {
      navClass = "me-button server-button active";
    }
    return (
      <div className="server-index">
        <Link className={navClass} to={`/@me/${this.props.currentUser.myChannel}`}>@me</Link>
        <div className="divider"></div>
        {serverList}
        <Link
          onClick={() => this.openModal()}
          className="add-server"
          to={this.props.location.pathname}>
          +
        </Link>
        <AddServerContainer
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}
          />
        <div className="divider"></div>
      </div>
    );
  }

}

export default ServerIndex;
