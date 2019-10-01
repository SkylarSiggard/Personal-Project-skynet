const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
    const db = req.app.get('db')
    const { email, password, password, number } = req.body

    // Check to see if the user has already registered
    const user = await db.find_email(email)
    // if they have, stop the function
    if (user[0]) return res.status(200).send({ message: 'Email already in use' })
    // Salt and hash the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    // Store the new user in the DB
    const userId = await db.add_user({ email, name })
    
    db.add_hash({ user_id: userId[0].user_id , hash }).catch(err => {
        return res.sendStatus(503)
    })
    // Store the new user in sessions
    req.session.user = { email, name, user_id: userId[0].user_id, isAdmin: false }
    // Send the session.user object to the front end
    res
    .status(201)
    .send({ message: 'Logged in', user: req.session.user, loggedIn: true })
    },
    async login(req, res) {
        const db = req.app.get('db')
        const {email, password} = req.body

        const user = await db.find_user(email)

        if (!user[0]) return res.status(200).send({message: 'Email not found'})

        const result = bcrypt.compareSync(password, user[0].hash)
        if (!result) return res.status(200).send({message: 'Incorrect password'})

        const {name,  is_admin: isAdmin, user_id: userId} = user[0]
        req.session.user = {email, name, userId, isAdmin}

        res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false, user: null})
    }
}