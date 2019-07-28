import axios from 'axios'
import {ADD_TO_CART, GET_USER_CART} from './actionTypes'

const initialState  = {
    cartProducts: [],
    error: false
}

export function getUserCart(id) {
    let data = axios.get(`/api/cart/${id}`)
    .then(res => res.data)
    return {type: GET_USER_CART, payload: data}
}

export function addToCart(product_id, list_id, quantity) {
    let data = axios.post('/api/cart', {product_id, list_id, quantity}).then(res => res.data)
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export function removeFromCart() {
    
}

export default function cartReducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case GET_USER_CART + '_FULFILLED':
            return {error: false, cartProducts: payload}
        case ADD_TO_CART + '_FULFILLED':
            return {...state, cart: payload}
        default: return state
    }
}