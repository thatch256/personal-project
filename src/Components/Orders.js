import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserOrders } from "../ducks/orderReducer";
import { getUser } from "../ducks/userReducer";
import OrderItems from "./OrderItems";

class Orders extends Component {
  componentDidMount() {
    let { getUserOrders, getUser } = this.props;
    let { id } = this.props.user;
    if (!this.props.user.loggedIn) {
      getUser();
    }
    getUserOrders(id);
  }

  render() {
    let { orderItems } = this.props;
    let arrayOfIds = [];
    orderItems.forEach(item => arrayOfIds.push(item.order_id));
    let filteredIdArray = [...new Set(arrayOfIds)];
    return (
      <div>
        {!orderItems.length ? (
          <div>
            <div>You have no orders.</div>
          </div>
        ) : (
          <div>
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
  { getUserOrders, getUser }
)(Orders);
