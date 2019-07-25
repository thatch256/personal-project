import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, addProduct } from "../ducks/productReducer";
import Product from "./Product";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      currentPrice: 0
    }
  }

  componentDidMount() {
    let { getProducts, products } = this.props;
    if (!products.length) {
      getProducts();
    }
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addProduct = () => {
    let { name, category, currentPrice } = this.state;
    this.setState({
      name: "",
      category: "",
      currentPrice: 0
    });
    this.props.addProduct(name, category, currentPrice);
  };

  render() {
    let { name, category, currentPrice } = this.state;
    let { products } = this.props;
    return (
      <div>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
        {this.props.user.is_admin ? <div>
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={category}
            name="category"
            onChange={this.handleChange}
          />
          <input
            type="number"
            value={currentPrice}
            name="currentPrice"
            onChange={this.handleChange}
          />
          <button onClick={this.addProduct}>Add Product</button> 
        </div> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.products, ...state.user };
}

export default connect(
  mapStateToProps,
  { getProducts, addProduct }
)(Products);
