import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserCart, emptyCart } from "../ducks/cartReducer";
import { getUser } from "../ducks/userReducer";
import { Redirect } from "react-router-dom";
import CartProducts from "./CartProducts";
import { addToOrder } from "../ducks/orderReducer";

class Cart extends Component {
  componentDidMount() {
    let { getUser, getUserCart } = this.props;
    let { id } = this.props.user;
    if (!this.props.user.loggedIn) {
      getUser();
    }
    getUserCart(id);
  }

  totalPrice = () => {
    let { cartItems } = this.props;
    let newTotal = cartItems.reduce(
      (sum, product) => sum + product.quantity * product.current_price,
      0
    );
    return newTotal;
  };

  emptyCartItems = () => {
    let { emptyCart } = this.props;
    let { user_cart_id } = this.props.user;
    emptyCart(user_cart_id);
  };

  checkout = () => {
    let { addToOrder, cartItems } = this.props;
    addToOrder(cartItems);
    this.emptyCartItems();
  };

  render() {
    let { user, redirect, error, cartItems } = this.props;
    if (error || redirect) return <Redirect to="/home" />;
    if (!user.loggedIn) return <div>Loading</div>;
    return (
      <div>
        {!cartItems.length ? (
          <div>
            <div>Cart is empty</div>
          </div>
        ) : (
          <div>
            {cartItems.map(cartItem => (
              <CartProducts key={cartItem.id} {...cartItem} />
            ))}
            <h1>Total Price: ${this.totalPrice()}</h1>
            <button onClick={this.checkout}>Proceed To Checkout</button>{" "}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user, ...state.cartItems };
}

export default connect(
  mapStateToProps,
  { getUser, getUserCart, addToOrder, emptyCart }
)(Cart);
