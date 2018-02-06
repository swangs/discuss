import React from 'react';

class Users extends React.Component {

  render() {

    let usersList = this.props.users.map(user => {
      return <li className="users" key={user.id}>{user.username}</li>;
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
