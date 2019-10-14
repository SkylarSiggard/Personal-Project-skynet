import React, {Component} from 'react'
import Header from './../Header/Header'
import './everyEvent.scss'
import store from './../../store'
import axios from 'axios'
import moment from 'moment'

export default class List extends Component {
    constructor() {
        const reduxState = store.getState()
        super()
        this.state = {
            listOfEvents: [],
            login: reduxState.login,
            edit: false
        }
    }
    componentDidMount() {
        axios.get('/api/every').then(res => {
            this.setState({
                listOfEvents: res.data
            })
        })
    }
    render() {
        return(
            <div className='back'>
            <Header history={this.props.history}/>
            <div className='titlePage'>Everyone's events</div>
            <div className="list">
            {
                this.state.listOfEvents.length ? (
                this.state.listOfEvents.map(listOfEvents => {
                    return (
                    <div className='items'>
                        <div className='events'>
                        <div className="text">
                            {`Username: ${listOfEvents.email}`}
                        </div>
                        <div className="text">
                            {`Title of the event: ${listOfEvents.title}`}
                        </div>
                        <div className="text">
                            {`Event starts at ${moment(listOfEvents.starting).format("llll")}`}
                        </div>
                        <div className="text">
                            {`Event ends at ${moment(listOfEvents.ending).format("llll")}`}
                        </div>
                    </div>
                    </div>
                    )
                })
                ) : null
            }
            {/* <h1>{this.state.products.length ? this.state.products[0].name : null}</h1> */}
            </div>
        </div>
        )
    }
}