import axios from 'axios'
import {REGISTER, LOGIN, LOGOUT, GET_USER} from './actionTypes'

const initialState = {
    user: {
    },
    error: false,
    redirect: false
}

export const login = (email, password) => {
    let data = axios.post('/api/login', {email, password})
    .then(res => res.data)
    return {type: LOGIN, payload: data}
}

export const logout = () => {
    return {
      type: LOGOUT,
      payload: axios.delete('/api/logout')
    };
  };

export const register = (email, password) => {
    let data = axios.post('/api/register', {email, password})
    .then(res => res.data)
    return {type: REGISTER, payload: data}
}

export const getUser = () => {
    let data = axios.get('/api/user')
    .then(res => res.data)
    return {type: GET_USER, payload: data}
}

export default function(state = initialState, action) {
    let {type, payload} = action
    switch(type) {
        case LOGIN + '_FULFILLED':
            return {...state, user: payload, redirect: false, error: false}
        case LOGIN + '_REJECTED':
            return {...state, error: payload}
        case LOGOUT + '_FULFILLED':
            return {...state, user: {}, redirect: true, error: false}
        case REGISTER + '_FULFILLED':
            return {...state, user: payload, redirect: false, error: false}
        case REGISTER + '_REJECTED':
            return {...state, error: payload}
        case GET_USER + '_PENDING':
            return {...state, redirect: false, error: false}
        case GET_USER + '_FULFILLED':
            return {...state, user: payload, error: false}
        case GET_USER + '_REJECTED':
            return {...state, redirect: true, error: payload}
        default: return state
    }
}