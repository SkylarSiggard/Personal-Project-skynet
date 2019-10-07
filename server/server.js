require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')
const eventCtrl = require('./controllers/eventController')
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_PHONE_NUMBER
)
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')

const app = express()

app.use(express.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.use(pino)
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))
//auth endpoints 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
//event endpoints
app.get('/api/events', eventCtrl.getUserEvents)
app.post('/api/events', eventCtrl.addEvent)
app.put('/api/events/:event_id', eventCtrl.updateEvent)
app.delete('/api/events/:event_id', eventCtrl.deleteEvent)
//twillio 
app.post('/api/messages', (req, res) => {
    const {phonenumber, title, starting, ending, description} = req.body
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phonenumber,
        body: `Event name: ${title}. Description: ${description}. Event starts at ${starting} and ends ${ending}. Dont replay to this message, it wont be received.`
    })
    .then(() => {
        res.send(JSON.stringify({ success: true }))
    }) 
    .catch(err => {
        console.log(err)
        res.send(JSON.stringify({ success: false }))
    })
}) 

massive(CONNECTION_STRING).then(db => {
    app.set('db', db) 
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is running! Dont touch anything!`))
})
