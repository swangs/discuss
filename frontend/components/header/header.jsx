import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    let headerDetails;
    if (this.props.currentUser) {
      headerDetails = (
        <header>
          <h2>{this.props.currentUser.username}</h2>
          <button onClick={this.props.logout}>Logout</button>
        </header>
      );
    } else {
      headerDetails = (
        <header>
          <Link to="/login">Login</Link>
           &nbsp;
          <Link to="/register">Register</Link>
        </header>
      );
    }

    return (
      <header>
        {headerDetails}
      </header>

    );
  }
}

export default Header;
