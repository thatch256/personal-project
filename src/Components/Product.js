import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct, editProduct } from "../ducks/productReducer";
import { addToCart } from "../ducks/cartReducer";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      newName: props.name,
      newCategory: props.category,
      newCurrentPrice: props.current_price,
      newImageSource: props.image_source,
      quantity: 0
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  flipEdit = () =>
    this.setState({
      editing: !this.state.editing
    });

  delete = () => {
    let { id } = this.props;
    this.props.deleteProduct(id);
  };

  saveChanges = () => {
    let { id } = this.props;
    let { newName, newCategory, newCurrentPrice, newImageSource } = this.state;
    this.props.editProduct(
      id,
      newName,
      newCategory,
      newCurrentPrice,
      newImageSource
    );
  };

  componentDidUpdate(prevProps) {
    let { name, category, current_price, image_source } = this.props;
    if (prevProps !== this.props) {
      this.setState({
        newName: name,
        newCategory: category,
        newCurrentPrice: current_price,
        newImageSource: image_source,
        editing: false
      });
    }
  }

  handleQuantity = e => {
    this.setState({
      quantity: e.target.value
    });
  };

  incQuantity = () => {
    this.setState(prevState => {
      return {
        quantity: prevState.quantity + 1
      };
    });
  };

  decQuantity = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        };
      } else {
        return null;
      }
    });
  };

  addItemToCart = id => {
    let { addToCart } = this.props;
    let { quantity } = this.state;
    let { user_cart_id } = this.props.user;
    addToCart(id, user_cart_id, quantity);
  };

  render() {
    let {
      name,
      category,
      current_price: currentPrice,
      image_source: imageSource,
      id
    } = this.props;
    let {
      newName,
      newCategory,
      newCurrentPrice,
      newImageSource,
      editing
    } = this.state;
    return (
      <div className="product-container">
        {editing ? (
          <div className="editing-inputs">
            <div>
              Name:{" "}
              <input
                value={newName}
                onChange={this.handleChange}
                name="newName"
              />
            </div>
            <div>
              Category:{" "}
              <input
                value={newCategory}
                onChange={this.handleChange}
                name="newCategory"
              />
            </div>
            <div>
              Current Price:{" "}
              <input
                type="number"
                value={newCurrentPrice}
                onChange={this.handleChange}
                name="newCurrentPrice"
              />
            </div>
            <div>
              Image:{" "}
              <input
                type="text"
                value={newImageSource}
                onChange={this.handleChange}
                name="newImageSource"
              />
            </div>
            <div>
              <button className="edit-buttons" onClick={this.saveChanges}>Save Changes</button>
              <button className="edit-buttons" onClick={this.flipEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="main-content">
            <h1 className="product-name">{name}</h1>
            <h5 className="product-category">{category}</h5>
            <h3 className="product-price">${currentPrice}</h3>
            <img alt="product" src={imageSource} />
            <label className="product-quantity">Quantity: </label>
            <div className='quantity-inputs'>
              <input
                className="quantity-value"
                disabled
                type="number"
                name="quantity"
                id="quantity"
                value={this.state.quantity}
                onChange={this.handleQuantity}
              />
              <button class="inc-button" onClick={this.incQuantity}>
              <i class="fas fa-plus"></i>
              </button>
              <button class="dec-button" onClick={this.decQuantity}>
              <i class="fas fa-minus"></i>
              </button>
            </div>
            <button
              className="addtocart-button"
              onClick={() => this.addItemToCart(id)}
            >
              Add To Cart
            </button>
            {this.props.user.is_admin ? (
              <div>
                <button className="edit-buttons" onClick={this.flipEdit}>Edit</button>
                <button className="edit-buttons" onClick={this.delete}>Delete</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user };
}

export default connect(
  mapStateToProps,
  { deleteProduct, editProduct, addToCart }
)(Product);
