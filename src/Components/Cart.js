import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserCart } from "../ducks/cartReducer";
import { getUser } from "../ducks/userReducer";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CartProducts from './CartProducts'

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      category: "",
      currentPrice: 0,
      quantity: 0
    };
  }

  componentDidMount() {
    let { getUser, getUserCart } = this.props;
    let {id} = this.props.user
    if (!this.props.user.loggedIn) {
      getUser();
      
    }
    getUserCart(id);
  }

  removeFromCart = () => {

  }

  render() {
    let { user, redirect, error, cartProducts } = this.props;
    if (error || redirect) return <Redirect to="/home" />;
    if (!user.loggedIn) return <div>Loading</div>;
    return (
      <div>
         {(!cartProducts.length) ?
        <div>
          <div>Cart is empty</div>
          <Link to="/">Back to Products</Link>
        </div>
        : <div>
          {cartProducts.map(cartProduct => (
            <CartProducts key={cartProduct.id} {...cartProduct} />
          ))}
          <Link to="/">Back to Products</Link>
        </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user, ...state.cartProducts };
}

export default connect(
  mapStateToProps,
  { getUser, getUserCart }
)(Cart);
