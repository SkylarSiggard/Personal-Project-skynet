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
            starting_time: '',
            ending_time: '',
            starting_day: '',
            ending_day: '',
            phone_number: '',
            view: false
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
            starting_time: this.state.starting_time,
            ending_time: this.state.ending_time,
            starting_day: this.state.starting_day,
            ending_day: this.state.ending_day,
            phone_number: this.state.phone_number
            }
        })
    }
    render() {
        return(
        <div className="create">
            <Header history={this.props.history}/>
            <div className="creater-box">
                <div>Title</div>
                <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event'/>
                <input onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event'/>
                <input onChange={(e) => this.handleChange(e, 'starting_day')}  type="date" min="2019-10-01" max="2019-12-31" name="trip-start"/>
                <input onChange={(e) => this.handleChange(e, 'starting_time')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'ending_day')}  type="date" min="2019-10-01" max="2019-12-31" name="trip-start"/>
                <input onChange={(e) => this.handleChange(e, 'ending_time')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'phone_number')} placeholder='Phone number' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
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
                    {`Event starts at ${this.state.starting_time} on ${this.state.starting_day}`}
                </div>
                <div className="dates">
                    {`Event ends at ${this.state.ending_time} on ${this.state.ending_day}`}
                </div>
                <div className="number">
                    {`Phone number ${this.state.phone_number}`}
                </div>
                <button onClick={() => this.toggleView()}>Close View</button>
            </div>
            ) : (
                <button onClick={() => this.toggleView()}>View the event</button>
            )}
            <div>
            <Link to='/list'><button onClick={() => this.create()}>Submit</button></Link>
            </div>
        </div>
        )
    }
}