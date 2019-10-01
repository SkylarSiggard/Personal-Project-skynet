import React, {Component} from 'react'
import Header from './../Header/Header'
import './create.sass'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import store, {ADD_EVENT} from './../../store'


export default class Create extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            startingTime: '',
            endingTime: '',
            startingDate: '',
            endingDate: '',
            number: '',
            view: false
        }
        console.log(this.state.startingDate)
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
            startingTime: this.state.startingTime,
            endingTime: this.state.endingTime,
            startingDate: this.state.startingDate,
            endingDate: this.state.endingDate,
            number: this.state.number
            }
        })
    }
    render() {
        return(
        <div className="create">
            <Header/>
            <div className="creater-box">
                <div>Title</div>
                <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event'/>
                <input onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event'/>
                <input onChange={(e) => this.handleChange(e, 'startingDate')}  type="date" min="2019-10-01" max="2019-12-31" name="trip-start"/>
                <input onChange={(e) => this.handleChange(e, 'startingTime')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'endingDate')}  type="date" min="2019-10-01" max="2019-12-31" name="trip-start"/>
                <input onChange={(e) => this.handleChange(e, 'endingTime')}  type="time" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'number')} placeholder='Phone number' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
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
                    {`Event starts ${this.state.startingDate} and ends at ${this.state.startingTime}`}
                </div>
                <div className="dates">
                    {`Day the event starts ${this.state.endingDate} and ends ${this.state.endingTime}`}
                </div>
                <div className="number">
                    {`Phone number ${this.state.number}`}
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