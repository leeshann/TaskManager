const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerator = (userID) => {
    const token = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr'})
    return token
}

module.exports = jwtGenerator