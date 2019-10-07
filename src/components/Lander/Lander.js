import React, {Component} from 'react'
import './lander.scss'
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
            swal.fire({type: 'error', text: 'Passwords dont match' , showCancelButton: false, timer: 1500})
        } else {
            try {
                const res = await axios.post('/auth/register', {email, password})
                if (res.data.user) {
                    swal.fire({type: 'success', text: res.data.message, showCancelButton: false, timer: 1500})
                    this.updateUser(res.data.user)
                    this.props.history.push('/list')
                } 
            } catch (error) {
                swal.fire({type: 'error', text: 'Email is already in use', showCancelButton: false, timer: 1500})
            }
        } 
    }
    login = async () => {
        const {email, password} = this.state
        try {
            const res = await axios.post('/auth/login', {email, password})
            swal.fire({type: 'error', text: 'Wrong password or wrong email' , showCancelButton: false, timer: 1500})
            if (res.data.user) {
                this.updateUser(res.data.user)
                this.props.history.push('/list')
                swal.fire({type: 'success', text: res.data.message , showCancelButton: false, timer: 1000})
            }
        } catch (error) {  
            swal.fire({type: 'error', text: 'Wrong password or wrong email' , showCancelButton: false, timer: 1500})
        }
    }
    render() {
        return(
        <div className="lander">
            {!this.state.register
            ? (
                
                <div>
                <div className='titles'>Login in here</div>
                    <div className='login'>
                <div>Login Email</div>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                <div>Your Password</div>
                <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
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
                    <div>Your Email</div>
                    <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                    <div>Set a password</div>
                    <div>
                        <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
                    </div>
                        <input onChange={(e) => this.handleChange(e, 'password2')} type="text" placeholder='repeat password'/>
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
        )
    }
}
export default Lander