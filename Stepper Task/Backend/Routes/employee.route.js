const express = require("express")
const router = express.Router()

const employeeController = new(require("../Controllers/Employee.Controller"))()
const employeeValidators = require("../Middleware/Validators/Employee.Validator")

const upload = require('../Managers/File.Manager').upload
const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;

//Employee List
router.route("/list")
    .post(employeeController.list)

//Add Employee
router.route("/add")
    .post(upload().any(), employeeController.add)

router.route("/:id")
    .delete(employeeController.delete)

module.exports = router;