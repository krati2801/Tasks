const employeeModel = new (require("../Models/Employee.Model"))();

const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;

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

      const newEmployee = await employeeModel.add(req.body);
      res.handler.created(newEmployee, "EMPLOYEE.ADDED");
    } 
    catch(err){
      res.handler.serverError(err);
    }
  }

  async list(req, res) {
    try {
      const topics = await topicModel.list(req.body);
      res.handler.success(topics);
    } catch (err) {
      res.handler.serverError(err);
    }
  }

  async update(req, res) {
    try {
      if (req.body.name) {
        const topicExist = await topicModel.getDetailByIdorName(req.body.name);
        if (topicExist && topicExist.dataValues.id !== req.params.id)
          return res.handler.conflict("VALIDATION.EXISTS.TOPIC");
      }

      if (req.body.image && req.body.image.length > 0) {
        if (req.body.oldImage) {
          const fileName = FileManager.getFileNameFromUrl(req.body.oldImage);
          FileManager.delete(fileName, IMAGES.TOPIC, IMAGES.ORIGINAL);
        }

        await FileManager.generateThumbAndUploadToCloud(
          req.body.image,
          IMAGES.TOPIC
        );
        req.body.image = req.body.image[0];
      }

      await topicModel.updateById(req.body, req.params.id);
      res.handler.success(undefined, "TOPIC.UPDATED");
    } catch (err) {
      res.handler.serverError(err);
    }
  }

  async delete(req, res) {
    try {
      const topic = await topicModel.getDetailByIdorName(
        undefined,
        req.params.id
      );
      if (topic && topic.image) {
        const fileName = FileManager.getFileNameFromUrl(topic.image);
        FileManager.delete(fileName, IMAGES.TOPIC, IMAGES.ORIGINAL);
      }
      await topicModel.deleteById(req.params.id);
      res.handler.success(undefined, "TOPIC.DELETED");
    } catch (err) {
      res.handler.serverError(err);
    }
  }
};
