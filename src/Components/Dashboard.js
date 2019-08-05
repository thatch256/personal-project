import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../ducks/userReducer'
import Products from './Products'

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            this.props.getUser()
        }
    }

    render() {
       let {user, redirect, error} = this.props
       if (error || redirect) return <Redirect to='/home' />
       if (!user.loggedIn) return <div>Loading</div>
       return (
       <div>
           <Products />
       </div>
       )
    }
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, {getUser})(Dashboard)