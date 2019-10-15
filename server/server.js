require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')
const eventCtrl = require('./controllers/eventController')
const twilio = require('./controllers/twilioController')
const moment =require('moment-timezone')
const cron = require('node-cron')
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_PHONE_NUMBER
) 

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
app.use(express.static(`${__dirname}/../build`))

//! auth endpoints /////////////////// 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

//! event endpoints ////////////////
app.get('/api/events', eventCtrl.getUserEvents)
app.get('/api/every', eventCtrl.getEveryEvent)
app.post('/api/events', eventCtrl.addEvent)
app.put('/api/events/:event_id', eventCtrl.updateEvent)
app.delete('/api/events/:event_id', eventCtrl.deleteEvent)

//! cron  //////////////////////
app.post('/api/messages', twilio.text)

//! clean DB with cron 
cron.schedule("00 02 * * * ", async function() {
    console.log('Scanning DataBase')
    const today = new Date()
    const db = app.get('db')
    const result = await db.delete_after_complete([today])
    console.log('Cleaned DataBase')
}, null, true, 'America/Denver')

//! reboot ///////////////
cron.schedule("15 02 * * * ", async function() {
    process.exit(1)
}, null, true, 'America/Denver')


//! rescheduled crons will 
cron.schedule("30 02 * * *", async function() {
    console.log('Scanning DataBase')
    const db = app.get('db')
    const result = await db.restart_cron()
    console.log('Rescheduled Cron')
    result.map(event => {
        console.log(event)
        if (event.edit === false) {
        const min = moment(event.reminder).format('m')
        const hour = moment(event.reminder).format('HH')
        const day = moment(event.reminder).format('D')
        const dayOfWeek = moment(event.reminder).format('d')
        const month = moment(event.reminder).format('M')
        console.log('min', min,'hour', +hour + 6, 'day:', day, ', month:', month, "weekday:", dayOfWeek)
    cron.schedule(`${min} 7 ${day} ${month} *`, function() {
        console.log('---------------')
        console.log('Running Text Cron Job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: event.phonenumber,
            body: `Event name: ${event.title} Details: ${event.description} Starts at: ${moment(event.starting).format('llll')} Ends at: ${moment(event.ending).format('llll')}. Dont replay to this message, it wont be received.`
        })
        .then( async () => {
            console.log('text sent')
        }) 
        .catch(err => {
            console.log(err)
        })
    })
        } else {
        const min = moment(event.reminder).format('m')
        const hour = moment(event.reminder).format('HH')
        const day = moment(event.reminder).format('D')
        const dayOfWeek = moment(event.reminder).format('d')
        const month = moment(event.reminder).format('M')
        console.log('min', min,'hour', +hour + 6, 'day:', day, ', month:', month, "weekday:", dayOfWeek)
    cron.schedule(`${min} 7 ${day} ${month} *`, function() {
        console.log('---------------')
        console.log('Running Text Cron Job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: event.phonenumber,
            body: `Rescheduled Event: ${event.title} Details: ${event.description} Starts at: ${moment(event.starting).format('llll')} Ends at: ${moment(event.ending).format('llll')}. Dont replay to this message, it wont be received.`
        })
        .then( async () => {
            console.log('text sent')
        }) 
        .catch(err => {
            console.log(err)
        })
    })
        }
    })
})

massive(CONNECTION_STRING).then(db => {
    app.set('db', db) 
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is running! Dont touch anything!`))
})


