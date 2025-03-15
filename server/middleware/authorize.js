const jwt = require('jsonwebtoken')
require('dotenv').config() 

const authorize = async (req, res, next) => {
    try {
        const accessToken = req.header("Authorization")?.split(" ")[1]
        console.log("Request path:", req.originalUrl, "Method:", req.method)
        console.log("Has token:", !!accessToken)
        if (!accessToken) {
            res.status(401).send("You are not authorized")
            return 
        }

        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if(!payload) {
            res.status(401).send("Token has expired")
            return 
        }

        req.user = payload.userID

        console.log("Token valid, passing to endpoint for completion")
        next()
        
    } catch (error) {
        console.error("In ./authorize.js: ", error.message)
        res.status(401).send("Token has expired")
        return 
    }
}

module.exports = authorize