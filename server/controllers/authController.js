const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
    const db = req.app.get('db')
    const { email, password} = req.body

    const foundUser = await db.find_user(email)
    const result = foundUser[0]
    
    if (result) return res.status(409).send({ message: 'Email already in use' })
    
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    const registerUser = await db.register_user( email, hash )

    const user = registerUser[0]
    
    req.session.user = {email: user.email, userId: user.user_id}

    return res.status(200).send(req.session.user)
    },
    async login(req, res) {
        const db = req.app.get('db')
        const {email, password} = req.body

        const foundUser = await db.find_user_exists(email)
        const user = foundUser[0]

        if (!user) return res.status(200).send({message: 'Email not found'})

        const result = bcrypt.compareSync(password, user.hash)
        if (!result) return res.status(200).send({message: 'Incorrect password'})

        req.session.user = {email: user.email, userId: user.user_id}

        res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false, user: null})
    }
}