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
      e.preventDefault();
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
    const demoUser = () => {
      this.props.submitForm({username: "demouser", password: "demouser"});
    };
    const demo = <button onClick={demoUser}>Demo</button>;

    if (this.props.formType === "login") {
      return (
        <p>Need an account? {demo} <Link to="/register">Register</Link></p>
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
      <div id="session">
        <div className="auth-box">
          <div className="auth-logo">
            <h1><Link to="/">DISCUSS</Link></h1>
          </div>
          <div className="auth-container">
            <h1>{header}</h1>
            <ul className="errors">
              {this.renderErrors()}
            </ul>
            <form
              className="auth-form"
              onSubmit={this.handleSubmit()}>
              <label>Username<br/>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInput("username")}>
                </input>
              </label>
              <label>Password<br/>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput("password")}>
                </input>
              </label>
              <input
                className="auth-submit"
                type="submit"
                value={this.props.formType}>
              </input>
            </form>
            {this.switchForms()}
          </div>
        </div>
      </div>
    );


  }
}

export default SessionForm;
