require('dotenv').config()
const moment =require('moment-timezone')
const cron = require('node-cron')
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_PHONE_NUMBER
)

module.exports = {
    text: async (req, res) => {
        const {phonenumber, title, starting, ending, reminder, description} = req.body
        const min = moment(reminder).format('m')
        const hour = moment(reminder).format('HH')
        const day = moment(reminder).format('D')
        const month = moment(reminder).format('M')
        console.log('min', min,'hour', hour, 'day:', day, 'month:', month)
    res.header('Content-Type', 'application/json');
    // cron.schedule(`${min} ${hour} ${day} ${month} *`, function() {
    cron.schedule(`* ${hour} ${day} ${month} *`, function() {
        console.log('---------------')
        console.log('Running Cron job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phonenumber,
            body: ` ${title} ${description} ${starting} ${ending}. Dont replay to this message, it wont be received.`
        })
        .then( async () => {
            console.log('text sent')
            res.send(JSON.stringify({ success: true }))
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
//     }) 
//     .catch(err => {
//         console.log(err)
//         res.send(JSON.stringify({ success: false }))
//     })
// }) 