import React from 'react';

class Users extends React.Component {

  startDirectMessage(user) {
    return () => {
      const serverId = this.props.currentUser.myServer;
      const userId = user.id;
      let channel;
      this.props.postChannel(serverId, { userId })
        .then(response => { channel = response.currentChannel; },
          error => this.props.history.push(`/@me/${error.errors[0]}`))
        .then(() => this.props.history.push(`/@me/${channel.id}`));
    };
  }

  render() {
    let usersList = this.props.users.map(user => {
      return <li
        onClick={this.startDirectMessage(user)}
        className="users"
        key={user.id}>
        {user.username}
      </li>;
    });


    return (
      <div className="messages-users">
        <ul className="users-ul">
          <li className="users-header">MEMBERS</li>
          { usersList }
        </ul>
      </div>
    );
  }
}

export default Users;
