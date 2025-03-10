require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', require('./routes/auth.js'))
app.use('/dashboard', require('./routes/dashboard.js'))

app.listen(3029, () => console.log("Server is listening on port 3029..."))