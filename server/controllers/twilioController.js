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
        const hour = moment(starting).format('HH')
        const day = moment(starting).format('D')
        const dayOfWeek = moment(starting).format('d')
        const month = moment(starting).format('M')
        console.log('hour', hour, 'day:', day - 1, ', month:', month, "weeday:", dayOfWeek - 1 )
        // const db = req.app.get('db')
        // const {userId} = req.session.user
        // const {event_id} = req.params

    res.header('Content-Type', 'application/json');
    // cron.schedule(`00 ${hour} ${day - 1} ${month} ${dayOfWeek - 1}`, function() {
        cron.schedule(`* * ${day - 1} ${month} ${dayOfWeek - 1}`, function() {
        console.log('---------------')
        console.log('Running Cron job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phonenumber,
            body: `Event name: ${title}. Description: ${description}. Event starts at ${starting} and ends ${ending}. Dont replay to this message, it wont be received.`
        })
        .then( async () => {
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
    // editText: async (res, req) => {

    // },
    // deleteText: async (res, req) => {

    // },
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
//     }) 
//     .catch(err => {
//         console.log(err)
//         res.send(JSON.stringify({ success: false }))
//     })
// }) 