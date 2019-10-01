import React from 'react';
import './header.sass'
import {Link} from 'react-router-dom'


export default function Header() {
    return (
        <div>
            <Link to='/list'><button>List</button></Link>
            <Link to='/create'><button>Create</button></Link>
            <Link to='/'><button>Logout</button></Link>
        </div>
    );
}

