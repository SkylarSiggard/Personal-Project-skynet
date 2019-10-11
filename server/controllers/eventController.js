module.exports = {
    getUserEvents: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const userEvents = await db.get_user_events([userId])
        return res.status(200).send(userEvents)
    },
    getEveryEvent: async (req, res) => {
        const db = req.app.get('db')
        const userEvents = await db.see_all_events()
        return res.status(200).send(userEvents)
    },
    addEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting, ending, reminder, phonenumber} = req.body
        const {userId} = req.session.user
        const userEvents = await db.add_user_event([title, description, starting, ending, phonenumber, reminder, userId])
        return res.status(200).send(userEvents)
    },
    updateEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting, ending, reminder, phonenumber} = req.body
        const {userId} = req.session.user
        const {event_id} = req.params
        const userEvents = await db.update_user_event({userId, event_id, title, description, starting, ending, phonenumber, reminder})
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
