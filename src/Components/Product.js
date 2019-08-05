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
      newCurrentPrice: props.currentPrice,
      newImageSource: props.imageSource,
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
    let { id, deleteProduct } = this.props;
    deleteProduct(id);
  };

  save = () => {
    let { id, editProduct } = this.props;
    let { newName, newCategory, newCurrentPrice, newImageSource } = this.state;
    editProduct(id, newName, newCategory, newCurrentPrice, newImageSource);
  };

  componentDidUpdate(prevProps) {
    let { name, category, currentPrice, imageSource } = prevProps;
    if (
      name !== this.props.name ||
      category !== this.props.category ||
      currentPrice !== this.props.currentPrice || 
      imageSource !== this.props.imageSource
    ) {
      this.setState({
        newName: name,
        newCategory: category,
        newCurrentPrice: currentPrice,
        newImageSource: imageSource,
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
    let { name, category, current_price: currentPrice, image_source: imageSource, id } = this.props;
    let { newName, newCategory, newCurrentPrice, newImageSource, editing } = this.state;
    return (
      <div className="product-container">
        {editing ? (
          <div>
            <input
              value={newName}
              onChange={this.handleChange}
              name="newName"
            />
            <input
              value={newCategory}
              onChange={this.handleChange}
              name="newCategory"
            />
            <input
              type="number"
              value={newCurrentPrice}
              onChange={this.handleChange}
              name="newCurrentPrice"
            />
             <input
              type="text"
              value={newImageSource}
              onChange={this.handleChange}
              name="newImageSource"
            />
            <div>
              <button onClick={this.save}>Save Changes</button>
              <button onClick={this.flipEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className='main-content'>
            <h1 className='product-name'>{name}</h1>
            <h5 className='product-category'>{category}</h5>
            <h3 className='product-price'>${currentPrice}</h3>
            <img alt='product' src={imageSource} />
            <label>Quantity: </label>
            <form>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={this.state.quantity}
                onChange={this.handleQuantity}
              />
              <input type="button" onClick={this.incQuantity} value="+" />
              <input type="button" onClick={this.decQuantity} value="-" />
            </form>
            <button onClick={() => this.addItemToCart(id)}>Add To Cart</button>
            {this.props.user.is_admin ? (
              <div>
                <button onClick={this.flipEdit}>Edit</button>
                <button onClick={this.delete}>Delete</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.user, };
}

export default connect(
  mapStateToProps,
  { deleteProduct, editProduct, addToCart }
)(Product);
