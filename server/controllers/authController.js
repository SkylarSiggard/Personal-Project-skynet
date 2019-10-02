const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
    const db = req.app.get('db')
    const { email, password} = req.body

    const user = await db.find_email(email)
    console.log('email found', user)
    
    if (user[0]) return res.status(200).send({ message: 'Email already in use' })
    
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    const userId = await db.add_user({ email })
    console.log('made it to hash', userId)
    
    db.add_hash({ user_id: userId[0].user_id , hash }).catch(err => {
        return res.sendStatus(503)
    })
    
    req.session.user = { email, user_id: userId[0].user_id }
    
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

        const {user_id: userId} = user[0]
        req.session.user = {email, userId}

        res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false, user: null})
    }
}