import React, {Component} from 'react'
import Header from './../Header/Header'
import './create.sass'

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
    render() {
        return(
        <div className="create">
            <Header/>
            <div className="creater-box">
                <div>Title</div>
                <input onChange={(e) => this.handleChange(e, 'title')}  type="text" placeholder='Title of the event'/>
                <input onChange={(e) => this.handleChange(e, 'description')}  type="text" placeholder='Description of the event'/>
                <input onChange={(e) => this.handleChange(e, 'startingTime')}  type="text" placeholder='Time the event will start'/>
                <input onChange={(e) => this.handleChange(e, 'endingTime')}  type="text" placeholder='Time the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'startingDate')}  type="text" placeholder='The day the event will start'/>
                <input onChange={(e) => this.handleChange(e, 'endingDate')}  type="text" placeholder='The day the event will end'/>
                <input onChange={(e) => this.handleChange(e, 'number')}  type="text" placeholder='Phone number'/>
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
                    {`Event starts ${this.state.startingTime} and ends at ${this.state.endingTime}`}
                </div>
                <div className="dates">
                    {`Day the event starts ${this.state.startingDate} and ends ${this.state.endingDate}`}
                </div>
                <div className="number">
                    {`Phone number ${this.state.number}`}
                </div>
                <button onClick={() => this.toggleView()}>Close View</button>
            </div>
            ) : (
                <button onClick={() => this.toggleView()}>View the event</button>
            )}
        </div>
        )
    }
}