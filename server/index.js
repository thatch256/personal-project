require("dotenv").config({path: __dirname + "/../.env"})
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const uc = require('./controllers/userController')
const pc = require('./controllers/productController')
const initSession = require('./middleware/initSession')
const authCheck = require('./middleware/authCheck')
const cc = require('./controllers/cartController')
const oc = require('./controllers/orderController')

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(initSession)

app.post('/api/login', uc.login);
app.post('/api/register', uc.register);
app.get('/api/user', authCheck.usersOnly, uc.getUser);
app.delete('/api/logout', uc.logout);

app.get('/api/products', pc.getProducts)
app.delete('/api/products/:productId', authCheck.adminsOnly, pc.deleteProduct)
app.put('/api/products/edit/:productId', authCheck.adminsOnly, pc.editProduct)
app.post('/api/products', authCheck.adminsOnly, pc.addProduct)

app.get(`/api/cart/:id`, authCheck.usersOnly, cc.getUserCart)
app.post('/api/cart', authCheck.usersOnly, cc.addToCart)
app.delete('/api/cart/:id', authCheck.usersOnly, cc.removeFromCart)
app.delete('/api/emptycart/:id', authCheck.usersOnly, cc.emptyCart)

app.post('/api/orders', authCheck.usersOnly, oc.createOrder)
app.get('/api/orders/:id', authCheck.usersOnly, oc.getUserOrders)
app.delete('/api/orders/:id', authCheck.usersOnly, oc.cancelOrder)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})