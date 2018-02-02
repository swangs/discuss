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
          <form className="postServer" onSubmit={this.handleSubmit("create")}>
            <p>Create a server!</p>
            <label>Name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleInput("create")}
                >
              </input>
            </label>
            <input className="postSubmit" type="submit" value="Create!"></input>
          </form>
          <form className="joinServer" onSubmit={this.handleSubmit("join")}>
            <p>Join a server!</p>
            <label>Name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleInput("join")}
                >
              </input>
            </label>
            <input className="postSubmit" type="submit" value="Join!"></input>
          </form>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }

}

export default AddServer;
