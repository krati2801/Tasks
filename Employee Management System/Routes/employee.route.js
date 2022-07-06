const express = require("express")
const router = express.Router()

const employeeController = new(require("../Controllers/Employee.Controller"))()
const employeeValidators = require("../Middleware/Validators/Employee.Validator")

const upload = require('../Managers/File.Manager').upload

//Employee List
router.route("/list")
    .post(employeeController.list)

//Add Employee
router.route("/add")
    .post(upload().any(), employeeValidators.addEmployee, employeeController.add)

//Update and Delete Employee    
router.route("/:id?")
    .put(upload().any(), employeeController.update)
    .delete(employeeController.delete)

module.exports = router;