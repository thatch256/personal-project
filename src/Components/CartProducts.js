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
      <div className='main-content'>
        <h1 className='product-name'>{name}</h1>
        <h5 className='product-category'>{category}</h5>
        <h3 className='product-price'>${currentPrice}</h3>
        <img alt='product' src={imageSource} />
        <h4 className='product-quantity'>Quantity: {quantity}</h4>
        <button className="addtocart-button" onClick={this.removeItem}>Remove From Cart</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {removeFromCart})(CartProducts);
