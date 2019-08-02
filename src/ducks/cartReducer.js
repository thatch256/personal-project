import axios from 'axios'
import {ADD_TO_CART, GET_USER_CART, REMOVE_FROM_CART, EMPTY_CART} from './actionTypes'

const initialState  = {
    cartItems: [],
    error: false
}

export function getUserCart(id) {
    let data = axios.get(`/api/cart/${id}`)
    .then(res => res.data)
    return {type: GET_USER_CART, payload: data}
}

export function addToCart(product_id, list_id, quantity ) {
    let data = axios.post('/api/cart', {product_id, list_id, quantity}).then(res => res.data)
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export function removeFromCart(id) { 
    let data = axios.delete(`/api/cart/${id}`)
    .then(res => res.data)
    return {type: REMOVE_FROM_CART, payload: data}
}

export function emptyCart(id) {
    let data = axios.delete(`/api/emptycart/${id}`)
    .then(res => res.data)
    .catch(console.log)
    return {type: EMPTY_CART, payload: data}
}

export default function cartReducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case GET_USER_CART + '_FULFILLED':
            return {error: false, cartItems: payload}
        case ADD_TO_CART + '_FULFILLED':
            return {...state, cartItems: payload}
        case REMOVE_FROM_CART + '_FULFILLED':
            return {...state, cartItems: payload}
        case EMPTY_CART + '_FULFILLED':
            return {...state, cartItems: payload}
        default: return state
    }
}