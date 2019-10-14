import React from 'react'
import './about.scss'
import {Link} from 'react-router-dom'

function About() {
        return(
        <div className='background1'>
            <div className='center-box'>
            <div className='input-titles1'>About this website</div>
            <div className='info-box1'>
                <p>You can create an event and</p>
                <p>then be reminded by text message</p>
                <p>whenever you want it to come.</p>
                <p>You'll also be able to view other</p>
                <p>events created by other users.</p>
            </div>
            </div>
            <Link to='/'><button className='aboutbutton'>Login Screen</button></Link>
            </div>
        )
    }
export default About

