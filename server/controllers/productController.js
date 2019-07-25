module.exports = {
    async getProducts(req, res) {
      const db = req.app.get('db');
      let products = await db.get_products();
      res.send(products);
    },
    async deleteProduct(req, res) {
      let { productId } = req.params;
      const db = req.app.get('db');
      let products = await db.delete_product([+productId]);
    //   console.log(products);
      res.send(products);
    },
    async editProduct(req, res) {
      let { productId } = req.params;
      let { newName, newCategory, newCurrentPrice } = req.body;
      const db = req.app.get('db');
      let products = await db.edit_product([
        +productId,
        newName,
        newCategory,
        newCurrentPrice
      ]);
      res.send(products);
    },
    async addProduct(req, res) {
      let { name, category, currentPrice } = req.body;
      const db = req.app.get('db');
      let products = await db.add_product([name, category, currentPrice]);
      res.send(products);
    }
  };