import React, {Component} from 'react'
import Header from './../Header/Header'
import './create.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import store, {ADD_EVENT} from './../../store'
import moment from 'moment'

export default class Create extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            starting: '',
            ending: '',
            phonenumber: '',
            view: false,
            submitting: false,
            error: false
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
            starting: this.state.starting,
            ending: this.state.ending,
            phonenumber: this.state.phonenumber
            }
        })
        axios.post('/api/events', {
            title: this.state.title,
            description: this.state.description,
            starting: this.state.starting,
            ending: this.state.ending,
            phonenumber: this.state.phonenumber
            }).then(res => {
                this.setState({
                    title: '',
                    description: '',
                    starting: '',
                    ending: '',
                    phonenumber: ''
                })
            })
        axios.post('/api/messages', {
            title: this.state.title,
            description: this.state.description,
            starting: moment(this.state.starting).format('llll'),
            ending: moment(this.state.ending).format('llll'),
            phonenumber: this.state.phonenumber
            }).then(res => {
                this.setState({
                    title: '',
                    description: '',
                    starting: '',
                    ending: '',
                    phonenumber: ''
                })
            })
    }
    render() {
        const reminderTime = moment(this.state.starting).format('D')
        const removeTime = reminderTime - 1 
        const theReminderTime = `${moment(this.state.starting).format('LT')} on ${moment(this.state.starting).format('M')}/${removeTime}/${moment(this.state.starting).format('Y')}`
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
                <span className='input'>
                <input onChange={(e) => this.handleChange(e, 'starting')} type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00" pattern='llll'/>
                </span>
                </div>
                <div>
                <span className='input'>
                <input onChange={(e) => this.handleChange(e, 'ending')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                </span>
                </div>
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
                        {`Reminder will sent at ${theReminderTime}`}
                    </div>
                <div className="text">
                    {`Event name: ${this.state.title}`}
                </div>
                <div className="text">
                    {`Description: ${this.state.description}`}
                </div>
                <div className="text">
                    {`Event starts at ${moment(this.state.starting).format('llll')}`}
                </div>
                <div className="text">
                    {`Event ends at ${moment(this.state.ending).format('llll')}`}
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