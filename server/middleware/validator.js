const yup = require('yup')

const registerValidator = async (req, res, next) => {
    const { name, email, password } = req.body

    const schema = yup.object({
        name: yup.string().min(1).max(255).required(),
        email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    })

    const userData = {
        name: name,
        email: email,
        password: password
    }

    try {
        await schema.validate(userData)
        next()
    } catch (error) {
        console.error("In ./validator.js registerValidator: ", error.message)
        res.status(401).json(error.message)
    }
}

const loginValidator = async (req, res, next) => {
    const { email, password } = req.body

    const schema = yup.object({
        email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    })

    const userData = {
        email: email,
        password: password
    }

    try {
        await schema.validate(userData)
        next()
    } catch (error) {
        console.error("In ./validator.js loginValidator: ", error.message)
        res.status(401).json("Missing proper credentials")
    }
}

module.exports = { registerValidator, loginValidator}