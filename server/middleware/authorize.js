const jwt = require('jsonwebtoken')
require('dotenv').config() 

const authorize = async (req, res, next) => {
    try {

        const { token } = req.header("accessToken")

        if (!token) {
            return res.status(403).send("You are not authorized")
        }

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!isEqual) {
            return res.status(401).send("Token is not authentic")
        }

        req.user = payload.userID

        next()
        
    } catch (error) {
        console.error("In ./authorize.js: ", error.message)
        return res.status(403).send("You are not authorized")
    }
}

module.exports = authorize