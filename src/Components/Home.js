import React, { Component } from "react";
import Product from "./Product";
import { getProducts } from "../ducks/productReducer";
import { connect } from "react-redux";

class Home extends Component {
  
    componentDidMount() {
    let { getProducts, products } = this.props;
    if (!products.length) {
      getProducts();
    }
  }

  render() {
    let {products} = this.props
    return (
      <div>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.products };
}

export default connect(
  mapStateToProps,
  { getProducts }
)(Home);
