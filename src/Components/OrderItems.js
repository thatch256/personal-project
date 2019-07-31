import React, { Component } from "react";
import { connect } from "react-redux";

class OrderItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: props.currentPrice
    };
  }
  
  cancelOrder = () => {

  };

  handleClick = () => {
      
    return (
          <div>
            'sup.
          </div>
      )
  };

  render() {
    let { orderItemId } = this.props;
    return (
      <div>
        <div>
          Order #{orderItemId} {' '}
          <button onClick={this.handleClick}>Order Details</button>
        </div>
        Ordered On:{" "}
        {
          this.props.orderItems.orderItems.find(
            item => item.order_id === orderItemId
          ).formatted_order_date
        }
        {this.props.orderItems.orderItems.map(item => {
          if (item.order_id === orderItemId) {
            return <div>{item.name}</div>;
          }
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(OrderItems);
