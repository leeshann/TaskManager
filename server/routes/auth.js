const router = require('express').Router()
const pool = require('../database.js')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator.js')
const { registerValidator, loginValidator } = require('../middleware/validator.js')

router.post('/register', registerValidator, async (req, res) => {
    const { name, email, password } = req.body

    try {
        const response = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        )

        if (response.rows.length > 0) {
            return res.status(401).send("User already exists!")
        }
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = await pool.query(
            "INSERT INTO users(user_name, user_email, user_hashed_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        )

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.status(201).json({ accessToken: token })

    } catch (error) {
        console.log("In /register: ", error.message)
        res.status(500).send()
    }
})

router.post('/login', loginValidator, async (req, res) => {
    const { email, password } = req.body

    try {
        const response = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        )

        if (response.rows.length === 0) {
            return res.status(401).send("Email is not registered")
        }
    
        if (!await bcrypt.compare(password, response.rows[0].user_hashed_password)) {
            return res.status(401).send("Email or password is incorrect")
        }

        const token = jwtGenerator(response.rows[0].user_id)
        res.status(200).json({ accessToken: token })
    } catch (error) {
        console.log("In /login: ", error.message)
        res.status(500).send()
    }
})

module.exports = router