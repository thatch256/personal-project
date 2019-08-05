import React, { Component } from "react";
import { cancelOrder } from "../ducks/orderReducer";
import { connect } from "react-redux";

class OrderItems extends Component {
  constructor(props) {
    super(props);

    this.order = this.props.orderItems.filter(
      item => item.order_id === this.props.orderItemId
    );
    this.state = {
      price: props.currentPrice,
      orderItemId: this.props,
      showOrderDetails: false
    };
  }

  removeOrder = () => {
    let { orderItemId, cancelOrder } = this.props;
    cancelOrder(orderItemId);
  };

  handleClick = orderItemId => {
    this.setState({ orderItemId, showOrderDetails: true });
  };

  totalPrice = () => {
    let newTotal = this.order.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    return newTotal;
  };

  render() {
    let { orderItemId, orderItems } = this.props;

    return (
      <div>
        <div>
          Order #{orderItemId}{" "}
          <button onClick={() => this.handleClick(orderItemId)}>
            Order Details
          </button>
        </div>
        {this.state.showOrderDetails === true ? (
          <div>
            {this.state.showOrderDetails && this.order && (
              <div>
                {this.order.map(orderItem => (
                  <div>
                    Item: {orderItem.name}
                    Price: {orderItem.price}
                    Quantity: {orderItem.quantity}
                    <img alt='product' src={orderItem.imageSource} />
                  </div>
                ))}
              </div>
            )}
            Ordered On:{" "}
            {
              orderItems.find(item => item.order_id === orderItemId)
                .formatted_order_date
            }
            Total Price: ${this.totalPrice()}
            <button onClick={this.removeOrder}>Cancel Order</button>
          </div>
        ) : (
          <div>
            Ordered On:{" "}
            {
              orderItems.find(item => item.order_id === orderItemId)
                .formatted_order_date
            }
            {orderItems.map(item => {
              if (item.order_id === orderItemId) {
                return <div>{item.name}</div>;
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.orderItems };
}

export default connect(
  mapStateToProps,
  { cancelOrder }
)(OrderItems);
