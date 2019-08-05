import React, { Component } from "react";
import {removeFromCart} from '../ducks/cartReducer'
import { connect } from "react-redux";

class CartProducts extends Component {

  removeItem = () => {
    let {id, removeFromCart} = this.props
    removeFromCart(id)
  }

  render() {
    let { name, category, current_price: currentPrice, image_source: imageSource, quantity } = this.props;
    return (
      <div>
        <h4>{name}</h4>
        <h5>{category}</h5>
        <h3>${currentPrice}</h3>
        <img alt='product' src={imageSource} />
        <h4>Quantity: {quantity}</h4>
        <button onClick={this.removeItem}>Remove From Cart</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {removeFromCart})(CartProducts);
