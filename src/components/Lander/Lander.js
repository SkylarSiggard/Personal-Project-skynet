import React, {Component} from 'react'
import './lander.sass'
import {Link} from 'react-router-dom'
import swal from 'sweetalert2'
import axios from 'axios'


export default class Lander extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            email: '',
            password: '',
            password2: ''
        }
    }
    toggleChange = () => {
        this.setState({
            register: !this.state.register
        })
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    register = () => {
        const {email, password, password2} = this.state
        if (password === password2) {
            axios.post('/auth/register', {email, password}).then(user => {
                this.setState({
                    email: '',
                    password: ''
                })
                this.props.updateUser(user.data)
            })
            .catch(err => {
                this.setState({email: '', password: ''})
                swal.fire({type: 'success', text: 'You are Registered!'})
            })
        } else {
            swal.fire({type: 'error', text: 'Passwords dont match'})
        }
    }
    
    render() {
        return(
        <div className="lander">
            {!this.state.register
            ? (
            <div className="login">
                <div>Login in here</div>
                <div>Login Email</div>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                <div>Your Password</div>
                <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
                <div>
                    <button onClick={() => this.toggleChange()}>Register</button>
                    <Link to='/list'><button>Login</button></Link>
                </div>
            </div>
            ) : (
                <div className="login">
                    <div>Create an account</div>
                    <div>Your Email</div>
                    <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                    <div>Set a password</div>
                    <div>
                        <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
                    </div>
                        <input onChange={(e) => this.handleChange(e, 'password2')} type="text" placeholder='repeat password'/>
                <div>
                    <button onClick={() => this.toggleChange()}>Back to Login</button>
                    {/* <Link to='/list'> */}
                        <button onClick={() => this.register()}>Register</button>
                        {/* </Link> */}
                </div>
            </div>
            )}
        </div>
        )
    }
}