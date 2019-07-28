import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../ducks/userReducer";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  registerUser = () => {
    let { email, password } = this.state;
    this.props.register(email, password);
  };

  render() {
    let { email, password } = this.state;
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/home" />;
    return (
      <div>
        <div>
          <div>
            Email:{" "}
            <input
              type="text"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            Password:{" "}
            <input
              type="password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <button onClick={this.registerUser}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { register }
)(Register);
