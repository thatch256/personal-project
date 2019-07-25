import axios from 'axios'
import {GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT} from './actionTypes'

const initialState = {
    products: [],
    error: false
}

export function getProducts() {
    let data = axios.get('/api/products')
    .then(res => res.data)
    return {type: GET_PRODUCTS, payload: data}
}

export function deleteProduct(productId) {
    let data = axios.delete(`/api/products/${productId}`)
    .then(res => res.data)
    return {type: DELETE_PRODUCT, payload: data}
}

export function editProduct(productId, newName, newCategory, newCurrentPrice) {
    let data = axios.put(`/api/products/edit/${productId}`, {newName, newCategory, newCurrentPrice})
    .then(res => res.data)
    return {type: EDIT_PRODUCT, payload:data}
}

export function addProduct(name, category, currentPrice) {
    let data = axios.post('/api/products', { name, category, currentPrice }).then(res => res.data);
    return {
      type: ADD_PRODUCT,
      payload: data
    };
  }

export default function productReducer(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case GET_PRODUCTS + '_FULFILLED':
            return {error: false, products: payload}
        case GET_PRODUCTS + '_REJECTED':
            return {...state, error: payload}
        case EDIT_PRODUCT + '_FULFILLED':
            return {...state, products: payload}
        case DELETE_PRODUCT + '_FULFILLED':
            return {...state, products: payload}
        case ADD_PRODUCT + '_FULFILLED':
            return {...state, products: payload}
        default: return state
    }
}