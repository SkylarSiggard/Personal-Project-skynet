import React, {Component} from 'react'
import './lander.scss'
import swal from 'sweetalert2'
import axios from 'axios'
import store, {LOGIN_USER} from './../../store'
import {Link} from 'react-router-dom'

class Lander extends Component {
    constructor() {
        super()
        this.state = {
            register: false,
            email: '',
            password: '',
            password2: '',
            user: {}
        }
    }
    async componentDidMount() {
        this.setState({
            user: {}
        })
    }
    updateUser = (user) => {
        this.setState({
            user,
        });
        console.log(user)
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
    register = async () => {
        const {email, password, password2} = this.state
        if (password !== password2) {
            swal.fire({type: 'error', text: 'Passwords dont match' , showConfirmButton: false, timer: 1500})
        } else {
            try {
                const res = await axios.post('/auth/register', {email, password})
                if (res.data.user) {
                    swal.fire({type: 'success', text: res.data.message, showConfirmButton: false, timer: 1500})
                    this.updateUser(res.data.user)
                    this.props.history.push('/list')
                    store.dispatch({
                        type: LOGIN_USER,
                        payload: true
                    })
                } 
            } catch (error) {
                swal.fire({type: 'error', text: 'Email is already in use', showConfirmButton: false, timer: 1500})
            }
        } 
    }
    login = async () => {
        const {email, password} = this.state
        try {
            const res = await axios.post('/auth/login', {email, password})
            swal.fire({type: 'error', text: 'Wrong password or wrong email' , showConfirmButton: false, timer: 1500})
            if (res.data.user) {
                this.updateUser(res.data.user)
                this.props.history.push('/list')
                swal.fire({type: 'success', text: res.data.message , showConfirmButton: false, timer: 800})
                store.dispatch({
                    type: LOGIN_USER,
                    payload: true
                })
            }
        } catch (error) {  
            swal.fire({type: 'error', text: 'Wrong password or wrong email' , showConfirmButton: false, timer: 1500})
        }
    }
    render() {
        return(
        <div className='background'>
        <div className="lander">
            {!this.state.register
            ? (
                
                <div>
                <div className='titles'>Login in here</div>
                    <div className='login'>
                <div className='input-titles'>Username</div>
                <span className='input'>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='Username'/>
                </span>
                <div className='input-titles'>Your Password</div>
                <span className='input'>
                <input onChange={(e) => this.handleChange(e, 'password')} type="password" placeholder='Password'/>
                </span>
                <div>
                    <div className="log">
                        <button className='regbutton'  onClick={() => this.toggleChange()}>Register</button>
                        <button className='enter' onClick={() => this.login()}>Login</button>
                    </div>
                </div>
                    </div>
            </div>
            ) : (
                <div className='titles'>
                <div>Create an account</div>
                <div className="login">
                    <div className='input-titles'>Create a Username</div>
                <span className='input'>
                    <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='Username'/>
                </span>
                    <div className='input-titles'>Set a password</div>
                    <div>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'password')} type="password" placeholder='Password'/>
                        </span>
                    </div>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'password2')} type="password" placeholder='Repeat Password'/>
                        </span>
                <div>
                    <div className="log">
                        <button className='regbutton' onClick={() => this.toggleChange()}>Back to Login</button>
                        <button className='enter' onClick={() => this.register()}>Register</button>
                    </div>
                </div>
                </div>
            </div>
            )}
            </div>
            <Link to='/about'><button className='aboutbutton'>About</button></Link>
        </div>
        )
    }
}
export default Lander
