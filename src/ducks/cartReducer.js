import axios from 'axios'
import {ADD_TO_CART} from './actionTypes'

const initialState  = {
    cart: [],
    error: false,
    addedItems: [],
    total: 0
}

export function addToCart(product_id, list_id, quantity) {
    let data = axios.post('/api/cart', {product_id, quantity}).then(res => res.data)
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export function removeFromCart() {
    
}

export default function cartReducer(state = initialState, action) {
    let {type, payload, id} = action
    switch(type) {
        case ADD_TO_CART + '_FULFILLED':
            let addedItem = state.cart.find(cartItem => cartItem.id === +id)
            let existingItem = state.addedItems.find(cartItem => id === +cartItem.id)  
            if (existingItem) {
                addedItem.quantity += 1
                return {...state, total: state.total + addedItem.current_price}
            }  else {
                addedItem.quantity = 1
                let newTotal = state.total + addedItem.current_price
                return {...state, addedItems: [...state.addedItems, addedItem], total: newTotal}
            }
        default: return state
    }
}