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
      res.send(products);
    },
    async editProduct(req, res) {
      let { productId } = req.params;
      let { newName, newCategory, newCurrentPrice, newImageSource } = req.body;
      const db = req.app.get('db');
      let products = await db.edit_product([
        +productId,
        newName,
        newCategory,
        newCurrentPrice,
        newImageSource
      ]);
      res.send(products);
    },
    async addProduct(req, res) {
      let { name, category, currentPrice, imageSource } = req.body;
      const db = req.app.get('db');
      let products = await db.add_product([name, category, currentPrice, imageSource]);
      res.send(products);
    }
  };