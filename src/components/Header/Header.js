import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'
import './header.scss'
import store, {LOGIN_USER} from './../../store'  


export default class Header extends Component {
    state = {}
    logout = async () => {
        const res = await axios.delete('/auth/logout')
        this.props.history.push('/')
        swal.fire({type: 'success', text: res.data.message, showCancelButton: false, timer: 1000})
        store.dispatch({
            type: LOGIN_USER,
            payload: false
        })
    }
    render() {
        return (
            <div className='header'>
            <Link to='/list'><button className='list-button'>List</button></Link>
            <Link to='/create'><button className='create-button'>Create</button></Link>
            <Link to='/every'><button className='everyone-button'>Everyone's events</button></Link>
            <button onClick={() => this.logout()} className='logout-button'>Logout</button>
        </div>
        );
    }
}

