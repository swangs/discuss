import React from 'react';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: "" };
  }

  handleInput() {
    return (e) => {
      this.setState({ user: e.target.value });
    };
  }

  startDirectMessage(user) {
    return () => {
      const serverId = this.props.currentUser.myServer;
      const userId = user.id;
      let channel;
      this.props.postChannel(serverId, { userId })
        .then(response => { channel = response.currentChannel; },
          error => {
            this.setState({ user: "" });
            this.props.history.push(`/@me/${error.errors[0]}`);
          })
        .then(() => {
          this.setState({ user: "" });
          this.props.history.push(`/@me/${channel.id}`);
        });
      this.props.onClose();
    };
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.setState({ user: "" });
      this.props.onClose();
    }
  }

  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    let usersList;
    if (this.state.user === "") {
      usersList = this.props.users.map(user => {
        return <li
          onClick={this.startDirectMessage(user)}
          className="users"
          key={user.id}>
          {user.username}
        </li>;
      });
    } else {
      usersList = [];
      this.props.users.forEach(user => {
        if (user.username.toLowerCase().includes(this.state.user.toLowerCase())) {
          usersList.push(
            <li
              onClick={this.startDirectMessage(user)}
              className="users"
              key={user.id}>
              {user.username}
            </li>
          );
        }
      });
    }


    return (
      <div>
        <div className="modal">
          <input
            autoFocus
            className="user-search-input"
            placeholder="Search User"
            value={this.state.user}
            onChange={this.handleInput()}>
          </input>
          <ul className="users-ul">
            { usersList }
          </ul>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }
}

export default SearchUsers;
