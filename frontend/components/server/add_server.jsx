import React from 'react';
import { Redirect } from 'react-router-dom';

class AddServer extends React.Component {
  constructor(props){
    super(props);
    this.state = { name: "" };
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleInput() {
    return (e) => {
      this.setState({ name: e.target.value });
    };
  }

  handleSubmit() {
    return (e) => {
      e.preventDefault();
      this.props.postServer(this.state)
        .then(response => this.props.history.push(`/${response.currentServer.id}`))
        .then(reponse => this.props.onClose())
        .then(response => this.setState( { name: "" } ));
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
          <p>Enter a name to join (functionality not added yet) an existing server or
            create one if it doesn't exist!</p>
          <ul className="errors">
            {this.renderErrors()}
          </ul>
          <form className="postServer" onSubmit={this.handleSubmit()}>
            <label>Name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleInput()}
                >
              </input>
              <input className="postSubmit" type="submit" value="Create/Join!"></input>
            </label>
          </form>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }

}

export default AddServer;
