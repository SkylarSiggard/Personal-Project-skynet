import React from 'react'
import './about.scss'
import {Link} from 'react-router-dom'

function About() {
        return(
        <div className='background'>
            <div className='info-box'>
                <div className='input-titles'>About this website</div>
                <p>You can create an event and</p>
                <p>then be reminded by text message</p>
                <p>24 hours before the event.</p>
                <p>You'll also be able to view other</p>
                <p>events created by other users.</p>
            </div>
            <Link to='/'><button>Login Screen</button></Link>
            </div>
        )
    }
export default About

