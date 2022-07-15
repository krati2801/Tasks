const express = require("express")
const router = express.Router()

const productController = new(require("../Controllers/Product.Controller"))()
const productValidators = require("../Middleware/Validators/Product.Validator")

const upload = require('../Helpers/General.Helper').upload
const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;

//Product List
router.route("/list")
    .post(productController.list)

//Add Product
router.route("/add")
    .post(upload().any(), productValidators.addProduct, productController.add)

//Update and Delete Product  
router.route("/:id?")
    .put(upload().any(), productController.update)
    .delete(productController.delete)

module.exports = router;