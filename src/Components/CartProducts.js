import React, { Component } from "react";
// import { connect } from "react-redux";

class CartProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
        quantity: 0
    }
  }

  render() {
    let { name, category, current_price: currentPrice, quantity } = this.props;
    return (
      <div>
        <h4>{name}</h4>
        <h5>{category}</h5>
        <h3>${currentPrice}</h3>
        <h4>Quantity: {quantity}</h4>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//     return {}
// }

export default CartProducts;
