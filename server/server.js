require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')
const eventCtrl = require('./controllers/eventController')
const twilio = require('./controllers/twilioController')

const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))

//! auth endpoints /////////////////// 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

//! event endpoints ////////////////
app.get('/api/events', eventCtrl.getUserEvents)
app.post('/api/events', eventCtrl.addEvent)
app.put('/api/events/:event_id', eventCtrl.updateEvent)
app.delete('/api/events/:event_id', eventCtrl.deleteEvent)

//! cron  //////////////////////
app.post('/api/messages', twilio.text)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db) 
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is running! Dont touch anything!`))
})
