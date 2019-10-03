import React, {Component} from 'react'
import Header from './../Header/Header'
import './list.scss'
import {Link} from 'react-router-dom'
import store from './../../store'
import axios from 'axios'

export default class List extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        this.state = {
            listOfEvents: reduxState.listOfEvents,
            edit: false,
            title: '',
            description: '',
            startingtime: '',
            endingtime: '',
            startingday: '',
            endingday: '',
            phonenumber: ''
        }
    }
    componentDidMount() {
        axios.get('/api/events').then(res => {
            this.setState({
                listOfEvents: res.data
            })
        })
        console.log('list of events', this.state.listOfEvents)
    }
    handleEdit = (event_id) =>{
        axios.put(`/api/events/${event_id}`, {
            title: this.state.title,
            description: this.state.description,
            startingtime: this.state.startingtime,
            endingtime: this.state.endingtime,
            startingday: this.state.startingday,
            endingday: this.state.endingday,
            phonenumber: this.state.phonenumber
            }).then(res => {
                this.setState({
                    edit: !this.state.edit
                })
            })
            this.componentDidMount()
    }
    handleDelete = async (event_id) => {
        console.log('at delete', event_id)
        axios.delete(`/api/events/${event_id}`)
        this.componentDidMount()
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
                            {`Event starts at ${listOfEvents.startingtime} on ${listOfEvents.startingday}`}
                        </div>
                        <div className="dates">
                            {`Event ends at ${listOfEvents.endingtime} on ${listOfEvents.endingday}`}
                        </div>
                        <div className="number">
                            {`Phone number ${listOfEvents.phonenumber}`}
                        </div>
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                    <input onChange={(e) => this.handleChange(e, 'title')} placeholder="title" type="text" />
                    <input onChange={(e) => this.handleChange(e, 'description')} placeholder='Description' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingtime')} placeholder='Starting Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingtime')} placeholder='Ending Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingdate')} placeholder='Starting Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingdate')} placeholder='Ending Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'phonenumber')} placeholder='number' type="text" />
                    <button onClick={() => this.handleEdit(listOfEvents.event_id)}>Submit</button>
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