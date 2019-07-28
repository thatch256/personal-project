module.exports = {
    async getUserCart(req, res) {
        let {id} = req.params
        const db = req.app.get('db')
        let cartProducts = await db.get_user_products(+id)
        console.log(cartProducts)
        res.send(cartProducts)
    },
    async addToCart(req, res) {
        let {product_id, quantity} = req.body
        let {list_id} = req.session.user
        const db = req.app.get('db')
        let cart = await db.add_to_cart([product_id, list_id, quantity])
        res.send(cart)
    },
    async removeFromCart(req, res) {

    }
}