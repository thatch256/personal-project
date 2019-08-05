import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../ducks/userReducer";
import { Link, Redirect } from "react-router-dom";

class Header extends Component {
  backToHome = () => {
    this.props.logout();
    return <Redirect to="/home" />;
  };

  render() {
    return (
      <div className="header">
        {this.props.user.loggedIn ? (
          <div className='header-main'>
            <h1 className='header-logo'>Hatch's Pins and Patches</h1>
            <Link to="/">Products</Link> <Link to="/cart">Cart</Link>{" "}
            <Link to="/orders">Orders</Link>{" "}
            <button onClick={this.backToHome}>Logout</button>
          </div>
        ) : (
          <span className='header-main'>
            <Link to="/login">Login</Link> <Link to="/register">Register</Link>
          </span>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { logout }
)(Header);
