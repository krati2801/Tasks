const employeeModel = new (require("../Models/Employee.Model"))();

const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;
const fs = require('fs');
const url = require("url");
const path = require("path");

const { validationResult } = require("express-validator");

const FileManager = require("../Managers/File.Manager");
const { re } = require("mathjs");

module.exports = class{
  async add(req, res){
    try{
      const errors = validationResult(req);
        if(!errors.isEmpty())
        return res.handler.validationError(undefined, errors.array());
      
        console.log("Req", req.body)
      // const employeeExist = await employeeModel.getDetailByEmailOrPhone(req.body.email, req.body.phone);
      //   if(employeeExist)
      //   return res.handler.conflict("VALIDATION.EXISTS.EMAILORPHONE");

      if(req.body.image && req.body.image.length > 0){
        req.body.image = req.body.image[0];
      }

      if(req.body.professional){
        req.body.professional = JSON.parse(req.body.professional)
        if(req.body.resume && req.body.resume.length >0){
         req.body.professional[0].resume = req.body.resume[0]
        }
      }
      
      req.body.education = req.body.education ? JSON.parse(req.body.education) : ""
      req.body.experience = req.body.experience ? JSON.parse(req.body.experience) : ""
      req.body.organization = req.body.organization ? JSON.parse(req.body.organization) : ""
      
      if(req.body.isEdit){
        await employeeModel.deleteById(req.body.id)
      }
      const newEmployee = await employeeModel.add(req.body);
      res.handler.created(newEmployee, "EMPLOYEE.ADDED");
    } 
    catch(err){
      res.handler.serverError(err);
    }
  }

  async list(req, res) {
    try {
      const employees = await employeeModel.list(req.body);
      res.handler.success(employees);
    } 
    catch(err){
      res.handler.serverError(err);
    }
  }
  

  async update(req, res) {
    // try {
    //   await employeeModel.updateById(req.body, req.body.id);
    //   res.handler.success(undefined, "EMPLOYEE.UPDATED");
    // } catch (err) {
    //   res.handler.serverError(err);
    // }

    try{
      const employee= await employeeModel.getDetailById(req.body.id);
      console.log("emp", employee)
       let imageFilename, resumeFileName;
 
        if(employee && employee.image !== null){
         imageFilename = employee.image.split('/').pop()
 
        if(employee.professional.length > 0 && employee.professional[0].resume !== null)
         resumeFileName = employee.professional[0].resume.split('/').pop()
        
       await Promise.all([FileManager.removeFile(imageFilename), FileManager.removeFile(resumeFileName)])
     }
      await employeeModel.deleteById(req.body.id);
      console.log("body", req.body);
      const newDetails = await employeeModel.add(req.body);
      console.log("Details", newDetails)
        if(!newDetails) 
        return res.handler.conflict("VALIDATION.EXISTS.EMPLOYEE");
      
      return res.handler.created(newDetails);
    } 
    catch(err){
      res.handler.serverError(err);
    }
  }

  async delete(req, res) {
    try {
      console.log("hh")
      console.log("id", req.params.id);
      const employee= await employeeModel.getDetailById(req.params.id);
     console.log("emp", employee)
      let imageFilename, resumeFileName;

       if(employee && employee.image !== null){
        imageFilename = employee.image.split('/').pop()

       if(employee.professional.length > 0 && employee.professional[0].resume !== null)
        resumeFileName = employee.professional[0].resume.split('/').pop()
       
      await Promise.all([FileManager.removeFile(imageFilename), FileManager.removeFile(resumeFileName)])
    }
      await employeeModel.deleteById(req.params.id);
      res.handler.success(undefined, "EMPLOYEE.DELETED");
    } 
    catch(err){
      res.handler.serverError(err);
    }
  }
};
