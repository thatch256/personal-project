module.exports = {
  async getUserCart(req, res) {
    let { id } = req.params;
    const db = req.app.get("db");
    let cartItems = await db.get_user_products(+id);
    res.send(cartItems);
  },
  async addToCart(req, res) {
    let { product_id, list_id, quantity } = req.body;
    const db = req.app.get("db");
    let [alreadyExists] = await db.check_if_in_cart(product_id, list_id);
    if (alreadyExists) {
      let newQuantity = alreadyExists.quantity + quantity;
      let updatedCart = await db.update_cart_item(
        product_id,
        list_id,
        newQuantity
      );
      res.status(200).send(updatedCart);
    }
    if (!alreadyExists) {
      let cartItems = await db.add_to_cart([product_id, list_id, quantity]);
      res.send(cartItems);
    }
  },
  async removeFromCart(req, res) {
    let { id } = req.params;
    const db = req.app.get("db");
    let cartItems = await db.remove_from_cart([+id, req.session.user.id]);
    res.send(cartItems);
  },
  async emptyCart(req, res) {
    let { id } = req.params;
    const db = req.app.get("db");
    let cartItems = await db.empty_cart(+id);
    console.log(cartItems);
    res.send(cartItems);
  }
};
