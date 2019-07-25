import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer
})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(promiseMiddleware)))