require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use('/auth', require('./routes/auth.js'))


app.listen(3029, () => console.log("Server is listening on port 3029..."))