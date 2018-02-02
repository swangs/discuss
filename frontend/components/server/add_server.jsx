import React from 'react';
import { Redirect } from 'react-router-dom';

class AddServer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      create: { name: "" },
      join: { name: "" }
     };
  }

  componentWillMount() {
    this.setState({
      create: { name: "" },
      join: { name: "" }
     });
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleInput(type) {
    return (e) => {
      if (type === "create") {
        this.setState({ create: { name: e.target.value } });
      } else {
        this.setState({ join: { name: e.target.value } });
      }
    };
  }

  handleSubmit(type) {
    return (e) => {
      e.preventDefault();
      if (type === "create") {
        this.props.postServer(this.state.create)
        .then(response => this.props.history.push(`/${response.currentServer.id}`))
        .then(() => this.props.onClose());
      } else {
        this.props.joinServer(this.state.join)
        .then(response => this.props.history.push(`/${response.currentServer.id}`))
        .then(() => this.props.onClose());
      }
    };
  }

  renderErrors() {
    return (
      this.props.errors.map((error,i) => {
        return <li key={i}>{error}</li>;
      })
    );
  }


  render () {
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div>
        <div className="modal">
          <h1>OH, ANOTHER SERVER HUH?</h1>
          <ul className="errors">
            {this.renderErrors()}
          </ul>
          <div className="serverForm">
            <form className="postServer" onSubmit={this.handleSubmit("create")}>
              <h2>CREATE</h2>
              <p>Create a new server and invite your friends.  Its free!</p>
              <div className="server-icon"></div>
              <input
                type="text"
                placeholder="enter a server name"
                value={this.state.name}
                onChange={this.handleInput("create")}
                >
              </input>
              <input className="postSubmit" type="submit" value="Create a Server"></input>
            </form>
            <div className="or">or</div>
            <form className="joinServer" onSubmit={this.handleSubmit("join")}>
              <h2>JOIN</h2>
              <p>Enter a Server Name and join your friend's server.</p>
              <div className="server-icon"></div>
              <input
                type="text"
                placeholder="enter a server name"
                value={this.state.name}
                onChange={this.handleInput("join")}
                >
              </input>
              <input className="joinSubmit" type="submit" value="Join a Server"></input>
            </form>
          </div>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }

}

export default AddServer;
