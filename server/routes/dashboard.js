const router = require('express').Router()
const pool = require('../database.js')
const authorize = require('../middleware/authorize.js')

router.get('/', authorize, async (req, res) => {

    try {
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user]
        )

        const taskList = await pool.query(
            "SELECT * FROM task WHERE user_id = $1",
            [req.user]
        )
        res.status(200).json({name: user.rows[0].user_name, tasks: taskList.rows})
    } catch (error) {
        console.log("In /dashboard: ", error.message)
        res.status(500).send()
    }
})

router.post('/newTask', authorize, async(req, res) => {
    const { description, due_date, category, priority } = req.body

    try {
        const response = await pool.query(
            "INSERT INTO task (user_id, task_description, due_date, category, task_priority) VALUES ($1, $2, $3, $4, $5)",
            [req.user, description, due_date, category,priority]
        )

        res.status(201).send(response)
    } catch (error) {
        console.log("In /dashboard/newTask: ", error.message)
        res.status(500).send()
    }
})

module.exports = router