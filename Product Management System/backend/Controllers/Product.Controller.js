const productModel = new (require("../Models/Product.Model"))();

const { validationResult } = require("express-validator");
const GeneralHelper = require("../Helpers/General.Helper");

module.exports = class {
    async add(req, res) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.handler.validationError(undefined, errors.array());

            const productExist = await productModel.getDetailByName(req.body.productName);
            if(productExist)
                return res.handler.conflict("VALIDATION.EXISTS.PRODUCT");

            if(req.body.image && req.body.image.length > 0){
                req.body.image = req.body.image[0];
            }
            
            const newProduct = await productModel.add(req.body);
            res.handler.created(newProduct, "PRODUCT.ADDED");
        }
        catch(err){
            res.handler.serverError(err);
        }
    }

    async list(req, res) {
        try {
            const products = await productModel.list(req.body);
            res.handler.success(products);
        } catch (err) {
            res.handler.serverError(err);
        }
    }

    async update(req, res) {
      try{
        if(req.body.productName){
          const productExist = await productModel.getDetailByName(req.body.productName);
          if(productExist && productExist.dataValues.id !== req.params.id)
            return res.handler.conflict("VALIDATION.EXISTS.PRODUCT");
        }
        
        const product= await productModel.getDetailById(req.params.id);
          if(req.body.image && req.body.image.length > 0) {
            if(product.image!== null && product.image !== GeneralHelper.getDefaultImage()){
              let imageFilename = product.image.split('/').pop()
              await GeneralHelper.removeFile(imageFilename)
            }
            req.body.image = req.body.image[0];
          }
        
          await productModel.updateById(req.body, req.params.id);
          res.handler.success(undefined, "PRODUCT.UPDATED");
        } 
        catch(err){
          res.handler.serverError(err);
        }
      }
    
      async delete(req, res){
        try{
          const product= await productModel.getDetailById(req.params.id);
            if(product && product.image !== null && product.image !== GeneralHelper.getDefaultImage()){
              let imageFilename = product.image.split('/').pop()
              await GeneralHelper.removeFile(imageFilename);
            }
          await productModel.deleteById(req.params.id);
          res.handler.success(undefined, "PRODUCT.DELETED");
        } 
        catch(err){
          res.handler.serverError(err);
        }
      }
};
