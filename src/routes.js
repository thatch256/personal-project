import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Orders from './Components/Orders'

export default (
    <Switch>
        <Route path='/home' component={Home} />
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart' component={Cart} />
        <Route path='/orders' component={Orders} />
    </Switch>
)