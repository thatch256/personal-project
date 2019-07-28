import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../ducks/userReducer'
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className="header">
      {props.user.loggedIn ? (
        <div>
        <Link to='/cart'>Cart</Link>
        {' '}
        <button onClick={props.logout}>
          Logout
        </button>
        </div>
      ) : (
        <span>
          <Link to="/login" >
            Login
          </Link> {' '}
          <Link to="/register" >
            Register
          </Link>
        </span>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { logout }
)(Header);