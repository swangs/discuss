  import React from 'react';
  import { Link } from 'react-router-dom';
  import Typed from 'typed.js';


  class SessionForm extends React.Component {

  constructor(props) {
    super(props);

    const background = `background-${Math.floor(Math.random() * 5)}`;

    this.state = {
      username: "",
      password: "",
      background,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.props.clearErrors();
    }
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

      const demo = { username: 'demo', password: 'demopassword' };

      const username = {
          strings: ["demo"],
          typeSpeed: 100
      };

      const password = {
          strings: ["demopassword"],
          typeSpeed: 50
      };



      let demoUsername = setTimeout(() => {
        new Typed(".username", username);
      }, 10);
      let demoPassword = setTimeout(() => {
        new Typed(".password", password);
      }, 700);
      let demoSubmit = setTimeout(() => {
        this.props.submitForm(demo);
      }, 1600);

      this.setState({
        username: "",
        password: "",
        demoUsername,
        demoPassword,
        demoSubmit,
      });

    };
    const demo = <a onClick={demoUser}>Demo</a>;

    if (this.props.formType === "login") {
      return (
        <p>Need an account? <Link to="/register">Register</Link> or {demo}</p>
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
      <div id="session" className={ this.state.background }>
        <div className="auth-box">
          <div className="auth-logo">
            <div className="logo"></div>
            <h1><Link to="/">ĐISCUSS</Link></h1>
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
                  autoFocus
                  className="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInput("username")}>
                </input>
              </label>
              <label>Password<br/>
                <input
                  className="password"
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
