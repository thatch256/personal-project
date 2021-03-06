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
      currentPrice: 0,
      imageSource: ""
    };
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
    let { name, category, currentPrice, imageSource } = this.state;
    this.setState({
      name: "",
      category: "",
      currentPrice: 0,
      imageSource: ""
    });
    this.props.addProduct(name, category, currentPrice, imageSource);
  };

  render() {
    let { name, category, currentPrice, imageSource } = this.state;
    let { products } = this.props;
    return (
      <div>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
        {this.props.user.is_admin ? (
          <div>
            <h1 className='add-new-product'>Add New Product</h1>
          <div className='editing-inputs'>
            <div>Name: {' '}
            <input
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange}
            /></div>
            <div>Category: {' '}
            <input
              type="text"
              value={category}
              name="category"
              onChange={this.handleChange}
            /></div>
            <div>Current Price: {' '}
            <input
              type="number"
              value={currentPrice}
              name="currentPrice"
              onChange={this.handleChange}
            /></div>
            <div>Image: {' '}
            <input
              type="text"
              value={imageSource}
              name="imageSource"
              onChange={this.handleChange}
            /></div>
            <button className="logout-button" onClick={this.addProduct}>Add Product</button>
          </div>
          </div>
        ) : null}
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
