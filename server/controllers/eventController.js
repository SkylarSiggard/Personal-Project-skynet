const cron = require('node-cron')

module.exports = {
    getUserEvents: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const userEvents = await db.get_user_events([userId])
        cron.schedule("0 1 * * *", function() {
            console.log('Scanning DataBase')
            const today = new Date()
            
            const db = req.app.get('db')
            const result = db.delete_after_complete([today]).then(res => {
                res.status(200).send(result)
            })
            console.log('Cleaned DataBase')
        })
        res.status(200).send(userEvents)
    },
    getEveryEvent: async (req, res) => {
        const db = req.app.get('db')
        const userEvents = await db.see_all_events()
        res.status(200).send(userEvents)
    },
    addEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting, ending, phonenumber} = req.body
        const {userId} = req.session.user
        const userEvents = await db.add_user_event([title, description, starting, ending, phonenumber, userId])
        return res.status(200).send(userEvents)
    },
    updateEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting, ending, phonenumber} = req.body
        const {userId} = req.session.user
        const {event_id} = req.params
        const userEvents = await db.update_user_event({userId, event_id, title, description, starting, ending, phonenumber})
        return res.status(200).send(userEvents)
    },
    deleteEvent: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const {event_id} = req.params
        const result = await db.delete_event([userId, event_id])
        res.status(200).send(result)
    }
}
