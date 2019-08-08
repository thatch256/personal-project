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
    this.setState({ orderItemId, showOrderDetails: !this.state.showOrderDetails });
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
      <div className='main-content'>
        <div className='order-sum'>
          <div className='order-number'>Order #{orderItemId}</div>
          {this.state.showOrderDetails === true ? ( <div><button className="addtocart-button" onClick={() => this.handleClick(orderItemId)}>
            Order Summary
          </button></div> ) : 
          <button className="addtocart-button" onClick={() => this.handleClick(orderItemId)}>
          Order Details
        </button>}
        </div>
        {this.state.showOrderDetails === true ? (
          <div>
            {this.state.showOrderDetails && this.order && (
              <div>
                {this.order.map(orderItem => (
                  <div className='order-products'>
                    <div className='product-name'>Item: {orderItem.name}</div>
                    <div className='product-price'>Price: ${orderItem.price}</div>
                    <div className='product-quantity'>Quantity: {orderItem.quantity}</div>
                    <img alt='product' src={orderItem.image_source} />
                  </div>
                ))}
              </div>
            )}
            <div className='order-date'>Ordered On: {' '}
            {
              orderItems.find(item => item.order_id === orderItemId)
                .formatted_order_date
            }
            <div className="order-total-price">Total Price: ${this.totalPrice()} </div>
            </div>
            <button className="addtocart-button" onClick={this.removeOrder}>Cancel Order</button>
          </div>
        ) : (
          <div>
            <div className='order-date'>Ordered On: {' '}
            {
              orderItems.find(item => item.order_id === orderItemId)
                .formatted_order_date
            }
            </div>
            <div className='order-items'>
            {orderItems.map(item => {
              if (item.order_id === orderItemId) {
                return <div>{item.name}</div>;
              }
            })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.orderItems, ...state.user };
}

export default connect(
  mapStateToProps,
  { cancelOrder }
)(OrderItems);
