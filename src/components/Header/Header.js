import React, {Component} from 'react';
import './header.sass'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'



export default class Header extends Component {
    state = {}
    logout = async () => {
        const res = await axios.delete('/auth/logout')
        console.log(res)
        this.props.history.push('/')
        swal.fire({type: 'success', text: res.data.message})
    }
    render() {
        console.log(this.props.history)
        return (
            <div>
            <Link to='/list'><button>List</button></Link>
            <Link to='/create'><button>Create</button></Link>
            <button onClick={() => this.logout()}>Logout</button>
        </div>
        );
    }
}

