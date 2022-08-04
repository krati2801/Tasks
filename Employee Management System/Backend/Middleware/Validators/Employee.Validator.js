const { header, body } = require("express-validator")

exports.addEmployee = [
    body("firstName", "please enter firstName!!").trim().notEmpty(),
    body("lastName", "please enter lastName!!").trim().notEmpty(),
    body("email", "Email is required").trim().notEmpty().isEmail(),
    body("phone", "Mobile Number is required").trim().notEmpty().isNumeric()
]