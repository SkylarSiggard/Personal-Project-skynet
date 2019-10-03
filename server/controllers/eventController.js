module.exports = {
    getUserEvents: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const userEvents = await db.get_user_events([userId])
        return res.status(200).send(userEvents)
    },
    addEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, startingDay, endingDay, startingTime, endingTime, phoneNumber} = req.body
        const {userId} = req.session.user
        const userEvents = await db.add_user_event([title, description, startingDay, endingDay, startingTime, endingTime, phoneNumber, userId])
        return res.status(200).send(userEvents)
    },
    updateEvent: async (req, res) => {
        const db = req.app.get('db')
        const {title, description, startingDay, endingDay, startingTime, endingTime, phoneNumber} = req.body
        const {userId} = req.session.user
        const {event_id} = req.params
        const userEvents = await db.update_user_event({userId, event_id, title, description, startingDay, endingDay, startingTime, endingTime, phoneNumber})
        return res.status(200).send(userEvents)
    },
    deleteEvent: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const {event_id} = req.params
        db.delete_event([userId, event_id]).then(result => {
            res.status(200).send(result)
        })
    }
}
