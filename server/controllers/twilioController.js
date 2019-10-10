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
        const today = new Date()
        const min = moment(starting).format('m')
        const hour = moment(starting).format('HH')
        const day = moment(starting).format('D')
        const dayOfWeek = moment(starting).format('d')
        const month = moment(starting).format('M')
        console.log('min', min,'hour', hour, 'day:', day - 1, ', month:', month, "weeday:", dayOfWeek - 1 )
    res.header('Content-Type', 'application/json');
    cron.schedule(`${min} ${hour} ${day - 1} ${month} ${dayOfWeek - 1}`, function() {
        console.log('---------------')
        console.log('Running Cron job')
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phonenumber,
            body: ` ${title} ${description} ${starting} ${ending}. Dont replay to this message, it wont be received.`
        })
        .then( async () => {
            res.send(JSON.stringify({ success: true }))
            const result = await db.delete_after_complete([today])
            res.status(200).send(result)
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