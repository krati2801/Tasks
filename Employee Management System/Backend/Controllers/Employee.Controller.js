const employeeModel = new (require("../Models/Employee.Model"))();

const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;
const fs = require('fs');
const url = require("url");
const path = require("path");

const { validationResult } = require("express-validator");

const FileManager = require("../Managers/File.Manager");

module.exports = class{
  async add(req, res){
    try{
      const errors = validationResult(req);
        if(!errors.isEmpty())
        return res.handler.validationError(undefined, errors.array());
      
      const employeeExist = await employeeModel.getDetailByEmailOrPhone(req.body.email, req.body.phone);
        if(employeeExist)
        return res.handler.conflict("VALIDATION.EXISTS.EMAILORPHONE");

      if(req.body.image && req.body.image.length > 0){
        req.body.image = req.body.image[0];
      }
     
      if(req.body.professional){
        if(req.body.resume && req.body.resume.length >0){
         req.body.professional[0].resume = req.body.resume[0]
        }
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
    try {
      if(req.body.email || req.body.phone) {
        const employeeExist = await employeeModel.getDetailByEmailOrPhone(req.body.email, req.body.phone);
        if (employeeExist && employeeExist.dataValues.id !== req.params.id)
          return res.handler.conflict("VALIDATION.EXISTS.EMAILORPHONE");
      }

      if(req.body.image && req.body.image.length > 0) {
        if(employeeExist.image!== null){
          let imageFilename = employee.image.split('/').pop()
          await FileManager.removeFile(imageFilename)
        }
        req.body.image = req.body.image[0];
      }
    
      await employeeModel.updateById(req.body, req.params.id);
      res.handler.success(undefined, "EMPLOYEE.UPDATED");
    } catch (err) {
      res.handler.serverError(err);
    }
  }

  async delete(req, res) {
    try {
      const employee= await employeeModel.getDetailById(req.params.id);
     
      let imageFilename, resumeFileName;

       if(employee && employee.image !== null){
        imageFilename = employee.image.split('/').pop()

       if(employee.professional && employee.professional[0].resume !== null)
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
