const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
    const db = req.app.get('db')
    const { email, password} = req.body

    const result = await db.find_user([email])
    
    if (result[0]) return res.status(409).send({ message: 'Email already in use' })
    
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    const registerUser = await db.register_user([ email, hash ])

    const user = registerUser[0]
    
    req.session.user = {email: user.email, user_id: user_id}

    return res.status(200).send(req.session.user)
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