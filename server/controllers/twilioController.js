module.exports = {
    async createText(res, res) {
        const db = req.app.get('db')
        const {phonenumber, title, description, starting, ending} = req.body
        res.header('Content-Type', 'application/json');
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phonenumber,
            title: title,
            description: description,
            starting: starting,
            ending: ending
    })
    .then(() => {
        res.send(JSON.stringify({ success: true }))
    }) 
    .catch(err => {
        console.log(err)
        res.send(JSON.stringify({ success: false }))
    })
    }
}