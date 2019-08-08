import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cartItems: cartReducer,
    orderItems: orderReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))