module.exports = {
    getUserEvents: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const userEvents = await db.get_user_events([userId])
        return res.status(200).send(userEvents)
    },
    addEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting_day, ending_day, starting_time, ending_time, phone_number} = req.body
        const {userId} = req.session.user
        const userEvents = await db.add_user_event([title, description, starting_day, ending_day, starting_time, ending_time, phone_number, userId])
        return res.status(200).send(userEvents)
    },
    updateEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, starting_day, ending_day, starting_time, ending_time, phone_number} = req.body
        const {userId} = req.session.user
        const {event_id} = req.params
        const userEvents = await db.update_user_event({userId, event_id, title, description, starting_day, ending_day, starting_time, ending_time, phone_number})
        return res.status(200).send(userEvents)
    },
    deleteEvent: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const {event_id} = req.params
        db.delete_event([event_id, userId]).then(result => {
            res.status(200).send(result)
        })
    }
}
