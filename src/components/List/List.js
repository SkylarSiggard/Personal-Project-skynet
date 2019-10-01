import React, {Component} from 'react'
import Header from './../Header/Header'

export default class List extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return(
        <div className="list">
            <Header/>
            List
        </div>
        )
    }
}