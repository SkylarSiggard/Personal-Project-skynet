require('dotenv').config()
const moment =require('moment')
const cron = require('node-cron')
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_PHONE_NUMBER
)

module.exports = {
    text: async (req, res) => {
        const {phonenumber, title, starting, ending, description} = req.body
        const db = req.app.get('db')
        const {userId} = req.session.user
        const {event_id} = req.params
        const day = moment(starting).format('D')
        const month = moment(starting).format('M')
    console.log('times', "min", min, 'hour', hour, 'day', day - 1, 'month', month)

    res.header('Content-Type', 'application/json');
    cron.schedule(`* * ${day - 1} ${month} *`, function() {
        console.log('---------------')
        console.log('Running Cron job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phonenumber,
            body: `Event name: ${title}. Description: ${description}. Event starts at ${starting} and ends ${ending}. Dont replay to this message, it wont be received.`
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }))
            // const result = await db.delete_after_complete([userId, event_id])
            // res.status(200).send(result)
        }) 
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify({ success: false }))
        })
    })
    } 
}

//! twillio //////////////////////
// app.post('/api/messages', (req, res) => {
//     const {phonenumber, title, starting, ending, description} = req.body
//     res.header('Content-Type', 'application/json');
//     client.messages
//     .create({
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: phonenumber,
//         body: `Event name: ${title}. Description: ${description}. Event starts at ${starting} and ends ${ending}. Dont replay to this message, it wont be received.`
//     })
//     .then(() => {
//         res.send(JSON.stringify({ success: true }))
//         // maybe habe a delay for db.delete_after_complete.sql
//     }) 
//     .catch(err => {
//         console.log(err)
//         res.send(JSON.stringify({ success: false }))
//     })
// }) 