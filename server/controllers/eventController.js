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
    }
}