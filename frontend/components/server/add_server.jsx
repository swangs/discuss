import React from 'react';

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
          <h1>Create or Join Server</h1>
          <p>Enter a name to join an existing server or
            create one if it doesn't exist!</p>
          <ul className="errors">
            {this.renderErrors()}
          </ul>
          <form onSubmit={this.handleSubmit()}>
            <label>Name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleInput()}
                >
              </input>
              <input type="submit" value="Create/Join!"></input>
            </label>
          </form>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }

}

export default AddServer;