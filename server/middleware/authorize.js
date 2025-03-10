const jwt = require('jsonwebtoken')
require('dotenv').config() 

const authorize = async (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").split(" ")[1]

        if (!accessToken) {
            return res.status(401).send("You are not authorized")
        }

        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        req.user = payload.userID

        next()
        
    } catch (error) {
        console.error("In ./authorize.js: ", error.message)
        return res.status(401).send("Token has expired")
    }
}

module.exports = authorize