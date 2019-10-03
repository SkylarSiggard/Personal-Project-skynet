import React, {Component} from 'react'
import Header from './../Header/Header'
import './list.scss'
import {Link} from 'react-router-dom'
import store, {GET_EVENTS, DELETE_EVENT} from './../../store'
import axios from 'axios'

export default class List extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        console.log('list of events', reduxState.listOfEvents)
        this.state = {
            listOfEvents: reduxState.listOfEvents,
            edit: false,
            title: '',
            description: '',
            startingTime: '',
            endingTime: '',
            startingDay: '',
            endingDay: '',
            phoneNumber: ''
        }
    }
    componentDidMount() {
        axios.get('/api/events').then(res => {
            store.dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        })
    }
    handleDelete = async (event_id) => {
        const action ={
            type: DELETE_EVENT,
            payload: event_id
        }
        store.dispatch(action)
        axios.delete(`/api/events/${event_id}`).then(res => {
            console.log(res)
        })
    } 
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    render() {
        return(
            <div className="list">
            <Header history={this.props.history}/>
            {
                this.state.listOfEvents.length ? (
                this.state.listOfEvents.map(listOfEvents => {
                    return (
                    <div className='items'>
                        <div className="title">
                            {`Event name ${listOfEvents.title}`}
                        </div>
                        <div className="description">
                            {`Description ${listOfEvents.description}`}
                        </div>
                        <div className="times">
                            {`Event starts at ${listOfEvents.startingTime} on ${listOfEvents.startingDay}`}
                        </div>
                        <div className="dates">
                            {`Event ends at ${listOfEvents.endingTime} on ${listOfEvents.endingDay}`}
                        </div>
                        <div className="number">
                            {`Phone number ${listOfEvents.phoneNumber}`}
                        </div>
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                    <input onChange={(e) => this.handleChange(e, 'title')} placeholder="title" type="text" />
                    <input onChange={(e) => this.handleChange(e, 'description')} placeholder='Description' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingTime')} placeholder='Starting Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingTime')} placeholder='Ending Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingDate')} placeholder='Starting Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingDate')} placeholder='Ending Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'phoneNumber')} placeholder='number' type="text" />
                    <button>Submit</button>
                    </div>}
                        <button onClick={() => this.toggleEdit()}>Edit</button>
                        <button onClick={() => this.handleDelete(listOfEvents.event_id)}>Delete</button>
                    </div>
                    )
                })
                ) : null
            }
            {/* <h1>{this.state.products.length ? this.state.products[0].name : null}</h1> */}
            <Link to='/create'><button>Add to list</button></Link>
        </div>
        )
    }
}