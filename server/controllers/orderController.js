module.exports = {
  async createOrder(req, res) {
    let { id } = req.session.user;
    const db = req.app.get("db");
    let [order] = await db.create_order(id);
    let { cartItems } = req.body;
    let orderItems = [];
    for (let i = 0; i < cartItems.length; i++) {
      orderItems = await db.add_to_order([
        cartItems[i].id,
        cartItems[i].current_price,
        cartItems[i].quantity,
        order.id
      ]);
    }
    res.send(orderItems);
  },
  async getUserOrders(req, res) {
      let {id} = req.params
      const db = req.app.get('db')
      let orderItems = await db.get_user_orders(+id)
      res.send(orderItems)
  }
  //   async cancelOrder(req, res) {}
};
