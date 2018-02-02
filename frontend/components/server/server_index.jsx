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
      serverList = Object.values(this.props.servers).map(server => (
        <NavLink
          key={server.id}
          className="server-button"
          to={`/${server.id}`}>
          {server.name[0]}
        </NavLink>
      ));
    }

    return (
      <div className="server-index">
        <NavLink className="me-button server-button" to="/@me">@me</NavLink>
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
