import React, {Component} from 'react'
import './lander.sass'
import swal from 'sweetalert2'
import axios from 'axios'

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
        if (!password === password2) {
            swal.fire({type: 'error', text: 'Passwords dont match'})
        } else {
            try {
                const res = await axios.post('/auth/register', {email, password})
                if (res.data.user) {
                    this.updateUser(res.data.user)
                    swal.fire({type: 'success', text: res.data.message})
                } 
            } catch (error) {
                swal.fire({type: 'error', text: 'Email not found or Password is wrong'})
            }
        } 
    }
    login = async () => {
        const {email, password} = this.state
        const res = await axios.post('/auth/login', {email, password})
        if (res.data.user) {
            this.updateUser(res.data.user)
        }
        swal.fire({type: 'success', text: res.data.message})
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
                    <button onClick={() => this.login()}>Login</button>
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
                        <button onClick={() => this.register()}>Register</button>
                </div>
            </div>
            )}
        </div>
        )
    }
}
export default Lander