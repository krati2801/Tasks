const { header, body } = require("express-validator")

exports.addProduct = [
    body("productName", "please enter product name!!").trim().notEmpty(),
    body("quantity", "please enter product quantity!!").trim().notEmpty().isNumeric().withMessage("please enter product quantity properly!!"),
    body("price", "please enter product price").trim().notEmpty().isNumeric().withMessage("please enter product price properly!!")
]