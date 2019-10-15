import React, {Component} from 'react'
import Header from './../Header/Header'
import './list.scss'
import {Link} from 'react-router-dom'
import store from './../../store'
import axios from 'axios'
import moment from 'moment-timezone'

export default class List extends Component {
    constructor() {
        const reduxState = store.getState()
        super()
        let date = new Date()
        let dayDate = moment(date).format('D')
        let mouthDate = moment(date).format('M')
        let yearDate = moment(date).format('YYYY')
        let minDate = moment(date).format('m')
        let hourDate = moment(date).format('hh')
        let realDate = `${yearDate}-${mouthDate}-${+dayDate + 1}T00:${+minDate + 1}:${hourDate}Z`
        // console.log(realDate)
        this.state = {
            listOfEvents: reduxState.listOfEvents,
            login: reduxState.login,
            edit: false,
            madeEdit: true,
            title: '',
            description: '',
            starting: '',
            ending: '',
            phonenumber: '',
            reminder: '',
            dateNow: realDate 
        }
    }
    componentDidMount() {
        const reduxState = store.getState()
        this.setState({
            login: reduxState.login
        })
        // setTimeout(() => {console.log('timer: ', this.state.login)}, 3000)
        
        // console.log('on list:', this.state.login)
        // if (this.state.login === false) {this.props.history.push('/') }
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
            phonenumber: this.state.phonenumber,
            reminder: this.state.reminder,
            madeEdit: this.state.madeEdit
            }).then(res => {
                this.setState({
                    edit: false
                })
            })
            axios.post(`/api/messages`, {
                title: this.state.title + ' has been reschedule ',
                description: ' the event details ' + this.state.description,
                starting: ' the event starts ' + moment(this.state.starting).format('llll'),
                ending: ' and ends on ' + moment(this.state.ending).format('llll'),
                phonenumber: this.state.phonenumber,
                reminder: this.state.reminder,
                madeEdit: this.state.madeEdit
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
                // axios.post(`/api/messages/` , {
                //     title: 'The event: ' + this.state.title + ' has been cancelled. ',
                //     description: 'the decription of the event: ' + this.state.description,
                //     starting: ' the event cancelled on ' + moment(this.state.dateNow).format('llll'),
                //     phonenumber: this.state.phonenumber,
                //     reminder: moment(this.state.dateNow).format('llll'),
                //     madeEdit: this.state.madeEdit
                //     }).then(res => {
                //         this.setState({
                //             edit: false
                //         })
                //     }) 
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
                        <div className="text">
                            {`Event name: ${listOfEvents.title}`}
                        </div>
                        <div className="text">
                            {`Description: ${listOfEvents.description}`}
                        </div>
                        <div className="text">
                            {`Event starts at ${moment(listOfEvents.starting).format("llll")}`}
                        </div>
                        <div className="text">
                            {`Event ends at ${moment(listOfEvents.ending).format("llll")}`}
                        </div>
                        <div className="text">
                            {`Reminder ${moment(listOfEvents.reminder).format("llll")}`}
                        </div>
                        <div className="text">
                            {`Phone number: ${listOfEvents.phonenumber}`}
                        </div>
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='old event' maxLength="30"/>
                        </span>
                        <span className='input1'>
                        <textarea onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event' minLength="300"/>
                        </span>
                        <span className='input'>starting
                        <input onChange={(e) => this.handleChange(e, 'starting')} type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                        </span>
                        <span className='input'>ending
                        <input onChange={(e) => this.handleChange(e, 'ending')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                        </span>
                        <span className='input'>reminder
                        <input onChange={(e) => this.handleChange(e, 'reminder')}  type="datetime-local" min="2019-10-01T00:00" max="2020-10-01T00:00"/>
                        </span>
                        <span className='input'>
                        <input onChange={(e) => this.handleChange(e, 'phonenumber')}  placeholder='Phone number' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
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