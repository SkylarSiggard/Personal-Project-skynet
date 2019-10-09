import React, {Component} from 'react'
import Header from './../Header/Header'
import './list.scss'
import {Link} from 'react-router-dom'
import store from './../../store'
import axios from 'axios'
import moment from 'moment'

export default class List extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        this.state = {
            listOfEvents: reduxState.listOfEvents,
            edit: false,
            title: '',
            description: '',
            starting: '',
            ending: '',
            phonenumber: ''
        }
    }
    componentDidMount() {
        // if (this.state.listOfEvents.event_id === null) {this.props.history.push('/') }
        axios.get('/api/events').then(res => {
            this.setState({
                listOfEvents: res.data
            })
        })
    }
    handleEdit = (event_id) =>{
        axios.put(`/api/events/${event_id}`, {
            title: this.state.title,
            description: this.state.description,
            starting: this.state.starting,
            ending: this.state.ending,
            phonenumber: this.state.phonenumber
            }).then(res => {
                this.setState({
                    edit: false
                })
            })
            this.componentDidMount()
        }
        handleDelete = async (event_id) => {
            // console.log('at delete', event_id)
            axios.delete(`/api/events/${event_id}`)
        this.componentDidMount()
    } 
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    toggleEdit = (event_id) => {
        this.setState({
            edit: !this.state.edit
        })
    }
    render() {
                // console.log('list of events', this.state.listOfEvents)
        return(
            <div className='back'>
            <Header history={this.props.history}/>
            <div className='titlePage'>Your List of upcoming events</div>
            <div className="list">
            {
                this.state.listOfEvents.length ? (
                this.state.listOfEvents.map(listOfEvents => {
                    return (
                    <div className='items'>
                        <div className='events'>
                        <div className="title">
                            {`Event name: ${listOfEvents.title}`}
                        </div>
                        <div className="description">
                            {`Description: ${listOfEvents.description}`}
                        </div>
                        <div className="times">
                            {`Event starts at ${moment(listOfEvents.starting).format("llll")}`}
                        </div>
                        <div className="dates">
                            {`Event ends at ${moment(listOfEvents.ending).format("llll")}`}
                        </div>
                        <div className="number">
                            {`Phone number: ${listOfEvents.phonenumber}`}
                        </div>
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event' maxLength="30"/>
                        </span>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event' minLength="300"/>
                        </span>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'starting')} type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                        </span>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'ending')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                        </span>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'phonenumber')} placeholder='Phone number' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
                        </span>
                    <button className='newEvent' onClick={() => this.handleEdit(listOfEvents.event_id)}>Submit</button>
                    </div>}
                        <div class='buttons'>
                        <button className='open-edit' onClick={() => this.toggleEdit(listOfEvents.event_id)}>Edit</button>
                        <button className='deleteEvent' onClick={() => this.handleDelete(listOfEvents.event_id)}>Delete</button>
                        </div>
                    </div>
                    </div>
                    )
                })
                ) : null
            }
            {/* <h1>{this.state.products.length ? this.state.products[0].name : null}</h1> */}
            </div>
            <Link to='/create'><button className='add-to-list'>Add to list</button></Link>
        </div>
        )
    }
}