import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit() {
    return (e) => {
      this.props.submitForm(this.state);
    };
  }

  renderErrors() {
    return (
      this.props.errors.map((error,i) => {
        return <li key={i}>{error}</li>;
      })
    );
  }

  switchForms() {
    if (this.props.formType === "login") {
      return (
        <p>Need an account? <Link to="/register">Register</Link></p>
      );
    } else {
      return (
        <p>Already have an account? <Link to="/login">Login</Link></p>
      );
    }
  }

  render() {
    const header = this.props.formType === 'login' ? "WELCOME BACK!" : "CREATE AN ACCOUNT";
    return (
      <div>
        <h1>{header}</h1>
        <ul>
          {this.renderErrors()}
        </ul>
        <form onSubmit={this.handleSubmit()}>
          <label>Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput("username")}
              ></input>
          </label>
          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput("password")}
              ></input>
          </label>
          <input type="submit" value={this.props.formType}></input>
        </form>
        {this.switchForms()}
      </div>
    );


  }
}

export default SessionForm;
