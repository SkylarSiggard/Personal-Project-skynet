import React, {Component} from 'react'
import Header from './../Header/Header'
import './create.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import store, {ADD_EVENT} from './../../store'
import moment from 'moment-timezone'

export default class Create extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        this.state = {
            login: reduxState.login,
            title: '',
            description: '',
            starting: '',
            ending: '',
            phonenumber: '',
            reminder: '',
            madeEdit: false,
            view: false,
            submitting: false,
            error: false
        }
    }
    componentDidMount() {
        // console.log('on creater', this.state.login)
        // if (this.state.login === false) {this.props.history.push('/') }
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
            starting: this.state.starting,
            ending: this.state.ending,
            phonenumber: this.state.phonenumber,
            reminder: this.state.reminder,
            madeEdit: this.state.madeEdit
            }
        })
        axios.post('/api/events', {
            title: this.state.title,
            description: this.state.description,
            starting: this.state.starting,
            ending: this.state.ending,
            phonenumber: this.state.phonenumber,
            reminder: this.state.reminder,
            madeEdit: this.state.madeEdit
            }).then(res => {
                this.setState({
                    title: '',
                    description: '',
                    starting: '',
                    ending: '',
                    phonenumber: '',
                    reminder: '',
                    madeEdit: false
                })
            })
        axios.post('/api/messages', {
            title: 'Event name: ' + this.state.title,
            description: ' the details of the event ' + this.state.description,
            starting: ' the event starts at ' + moment(this.state.starting).format('llll'),
            ending: ' and ends on ' + moment(this.state.ending).format('llll'),
            phonenumber: this.state.phonenumber,
            reminder: moment(this.state.reminder).format('llll'),
            madeEdit: this.state.madeEdit
            }).then(res => {
                this.setState({
                    title: '',
                    description: '',
                    starting: '',
                    ending: '',
                    phonenumber: '',
                    reminder: '',
                    madeEdit: false
                })
            })
    }
    render() {
        return(
        <div>
            <Header history={this.props.history}/>
        <div className='create'>
                <div className='titlePage'>Create an event!</div>
                <div className="outer-box">
            <div  className="creater-box">
                <div>
                <span className='input'>
                <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event'/>
                </span>
                </div>
                <div>
                <span className='input1'>
                <textarea onChange={(e) => this.handleChange(e, 'description')} rows='4' cols='20' type="text" placeholder='Description of the event'/>
                </span>
                </div>
                <div>
                <span className='input'> starting
                <input onChange={(e) => this.handleChange(e, 'starting')} type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00" pattern='llll'/>
                </span>
                </div>
                <div>
                <span className='input'> ending
                <input onChange={(e) => this.handleChange(e, 'ending')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                </span>
                </div>
                <span className='input'> reminder
                <input onChange={(e) => this.handleChange(e, 'reminder')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                </span>
                <div>
                <span className='input'> 
                <input onChange={(e) => this.handleChange(e, 'phonenumber')} placeholder='+1(801)123-4567' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
                </span>
                </div>
            </div>
            {this.state.view 
            ? (
                <div className="viewer-box">
                    <div className='text'>
                        {`Reminder will sent at ${moment(this.state.reminder).tz("America/Denver").format('llll')}`}
                    </div>
                <div className="text">
                    {`Event name: ${this.state.title}`}
                </div>
                <div className="text">
                    {`Description: ${this.state.description}`}
                </div>
                <div className="text">
                    {`Event starts at ${moment(this.state.starting).tz("America/Denver").format('llll')}`}
                </div>
                <div className="text">
                    {`Event ends at ${moment(this.state.ending).tz("America/Denver").format('llll')}`}
                </div>
                <div className="text">
                    {`Phone number: ${this.state.phonenumber}`}
                </div>
                <button className='open-view' onClick={() => this.toggleView()}>Close View</button>
                <Link to='/list'><button className='submit' onClick={() => this.create()}>Submit</button></Link>
            </div>
            ) : (
                <button className='open-view' onClick={() => this.toggleView()}>View the event</button>
                )}
            <div>
                </div>
                </div>
        </div>
        </div>
        )
    }
}