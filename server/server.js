require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// massive(CONNECTION_STRING).then(db => {
//     app.set('db', db) 
// })
app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is running! Dont touch anything!`))
