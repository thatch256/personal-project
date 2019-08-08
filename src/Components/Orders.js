import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserOrders, getAllOrders } from "../ducks/orderReducer";
import { getUser } from "../ducks/userReducer";
import OrderItems from "./OrderItems";
import { Redirect } from "react-router-dom";

class Orders extends Component {
  componentDidMount() {
    let { getUserOrders, getUser, getAllOrders } = this.props;
    let { id } = this.props.user;
    if (!this.props.user.loggedIn) {
      getUser();
    }
    if (!this.props.user.is_admin) {
      getUserOrders(id);
    } else {
      getAllOrders();
    }
  }

  render() {
    let { orderItems, error, redirect } = this.props;
    let arrayOfIds = [];
    orderItems.forEach(item => arrayOfIds.push(item.order_id));
    let filteredIdArray = [...new Set(arrayOfIds)];
    if (error || redirect) return <Redirect to="/home" />;
    return (
      <div>
        {!orderItems.length ? (
          <div className="register-display">
            <div className='empty-orders'>You Have No Orders</div>
          </div>
        ) : (
          <div className="orders-display">
            {filteredIdArray.map(number => (
              <OrderItems key={number} orderItemId={number} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user, ...state.orderItems };
}

export default connect(
  mapStateToProps,
  { getUserOrders, getAllOrders, getUser }
)(Orders);
