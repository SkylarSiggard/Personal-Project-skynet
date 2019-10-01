import React, {Component} from 'react'
import Header from './../Header/Header'
import './list.sass'
// import {Link} from 'react-router-dom'
import store from './../../store'

export default class List extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        // console.log('list array', reduxState.listOfEvents)
        this.state = {
            listOfEvents: reduxState.listOfEvents,
            edit: false,
            title: '',
            description: '',
            startingTime: '',
            endingTime: '',
            startingDate: '',
            endingDate: '',
            number: ''
        }
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
            <Header/>
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
                            {`Event starts ${listOfEvents.startingDate} and ends at ${listOfEvents.startingTime}`}
                        </div>
                        <div className="dates">
                            {`Day the event starts ${listOfEvents.endingDate} and ends at ${listOfEvents.endingTime}`}
                        </div>
                        <div className="number">
                            {`Phone number ${listOfEvents.number}`}
                        </div>
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                    <input onChange={(e) => this.handleChange(e, 'title')} placeholder="title" type="text" />
                    <input onChange={(e) => this.handleChange(e, 'description')} placeholder='Description' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingTime')} placeholder='Starting Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingTime')} placeholder='Ending Time' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'startingDate')} placeholder='Starting Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'endingDate')} placeholder='Ending Date' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'number')} placeholder='number' type="text" />
                    {/* <button onClick={() => this.handleSubmit(products.item_id)}>Submit</button> */}
                    </div>}
                        <button onClick={() => this.toggleEdit()}>Edit</button>
                        {/* <button onClick={() => this.handleDelete(products.item_id)}>Delete</button> */}
                    </div>
                    )
                })
                ) : null
            }
            {/* <h1>{this.state.products.length ? this.state.products[0].name : null}</h1> */}
        </div>
        )
    }
}