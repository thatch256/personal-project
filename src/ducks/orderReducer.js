import axios from 'axios'
import {CREATE_ORDER, ADD_TO_ORDER, GET_USER_ORDERS, CANCEL_ORDER} from './actionTypes'

const initialState = {
    orderItems: [],
    error: false
}

export function createOrder(id) {
    let data = axios.post('/api/orders', {id})
    .then(res => res.data)
    return {
        type: CREATE_ORDER,
        payload: data
    }
}

export function addToOrder(cartItems) {
    let data = axios.post('/api/orders', {cartItems})
    .then(res => res.data)
    return {
        type: ADD_TO_ORDER,
        payload: data
    }
}

export function getUserOrders(id) {
    let data = axios.get(`/api/orders/${id}`)
    .then(res => res.data)
    return {
        type: GET_USER_ORDERS,
        payload: data
    }
}

export function cancelOrder(id) {
    let data = axios.delete(`/api/orders/${id}`)
    .then(res => res.data)
    return {
        type: CANCEL_ORDER,
        payload: data
    }
}

export default function orderReducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case CREATE_ORDER + '_FULFILLED':
            return {error: false, orderItems: payload}
        case ADD_TO_ORDER + '_FULFILLED':
            return {error: false, orderItems: payload}
        case GET_USER_ORDERS + '_FULFILLED':
            return {error: false, orderItems: payload}
        case CANCEL_ORDER + '_FULFILLED':
            return {error: false, orderItems: payload}
        default: return state
    }
}