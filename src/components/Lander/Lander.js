import React, {Component} from 'react'

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
    render() {
        return(
        <div className="lander">
            Lander
            {!this.state.register
            ? (
            <div className="login">
                <div>email</div>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                <div>password</div>
                <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
                <div>
                    <button onClick={() => this.toggleChange()}>Register</button>
                    <button>Login</button>
                </div>
            </div>
            ) : (
                <div className="login">
                <div>email</div>
                <input onChange={(e) => this.handleChange(e, 'email')} type="text" placeholder='email'/>
                <div>password</div>
                <input onChange={(e) => this.handleChange(e, 'password')} type="text" placeholder='password'/>
                <input onChange={(e) => this.handleChange(e, 'password2')} type="text" placeholder='password'/>
                <div>
                    <button onClick={() => this.toggleChange()}>Back to Login</button>
                    <button>Register</button>
                </div>
            </div>
            )}
        </div>
        )
    }
}