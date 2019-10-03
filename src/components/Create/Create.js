import React, {Component} from 'react'
import Header from './../Header/Header'
import './create.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import store, {ADD_EVENT} from './../../store'


export default class Create extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            startingtime: '',
            endingtime: '',
            startingday: '',
            endingday: '',
            phonenumber: '',
            view: false,
            starting: ''
        }
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    toggleView = () => {
        this.setState({
            view: !this.state.view
        })
    }
    create() {
        store.dispatch({
            type: ADD_EVENT,
            payload: {
            title: this.state.title,
            description: this.state.description,
            startingtime: this.state.startingtime,
            endingtime: this.state.endingtime,
            startingday: this.state.startingday,
            endingday: this.state.endingday,
            phonenumber: this.state.phonenumber
            }
        })
        axios.post('/api/events', {
            title: this.state.title,
            description: this.state.description,
            startingtime: this.state.startingtime,
            endingtime: this.state.endingtime,
            startingday: this.state.startingday,
            endingday: this.state.endingday,
            phonenumber: this.state.phonenumber
            }).then(res => {
                this.setState({
                    title: '',
            description: '',
            startingtime: '',
            endingtime: '',
            startingday: '',
            endingday: '',
            phonenumber: ''
                })
            })
    }
    render() {
        return(
        <div>
            <Header history={this.props.history}/>
            <div className='create'>
            <div className="creater-box">
                <div>Title</div>
                <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event'/>
                <input onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event'/>
                <input onChange={(e) => this.handleChange(e, 'startingday')}  type="date" min="2019-10-01" max="2020-12-31"/>
                {/* <input onChange={(e) => this.handleChange(e, 'startingday')} type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/> */}
                <input onChange={(e) => this.handleChange(e, 'startingtime')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'endingday')}  type="date" min="2019-10-01" max="2020-12-31"/>
                <input onChange={(e) => this.handleChange(e, 'endingtime')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'phonenumber')} placeholder='Phone number' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
            </div>
            {this.state.view 
            ? (
                <div className="viewer-box">
                <div className="title">
                    {`Event name ${this.state.title}`}
                </div>
                <div className="description">
                    {`Description ${this.state.description}`}
                </div>
                <div className="times">
                    {`Event starts at ${this.state.startingtime} on ${this.state.startingday}`}
                </div>
                <div className="dates">
                    {`Event ends at ${this.state.endingtime} on ${this.state.endingday}`}
                </div>
                <div className="number">
                    {`Phone number ${this.state.phonenumber}`}
                </div>
                <button onClick={() => this.toggleView()}>Close View</button>
            </div>
            ) : (
                <button onClick={() => this.toggleView()}>View the event</button>
                )}
                </div>
            <div>
            <Link to='/list'><button onClick={() => this.create()}>Submit</button></Link>
                </div>
        </div>
        )
    }
}