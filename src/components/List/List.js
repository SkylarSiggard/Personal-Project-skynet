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
    render() {
        return(
        <div className="list">
            <Header/>
            {
                this.state.listOfEvents.length ? (
                this.state.listOfEvents.map(listOfEvents => {
                    return (
                    <div className='items'>
                        {listOfEvents.title}
                                {listOfEvents.description}
                                {listOfEvents.startingTime}
                                {listOfEvents.endingTime}
                                {listOfEvents.startingDate}
                                {listOfEvents.endingDate}
                                {listOfEvents.number}
                        {!this.state.edit ? <>{this.props.text}</> :
                    <div>
                    <input onChange={(e) => this.handleChange(e, 'picture')} placeholder="url" type="text" />
                    <input onChange={(e) => this.handleChange(e, 'name')} placeholder='name' type="text" />
                    <input onChange={(e) => this.handleChange(e, 'price')} placeholder='price' type="text" />
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