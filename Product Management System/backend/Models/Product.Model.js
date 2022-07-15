const Product= require("../Database/Schemas").product_details;
const { Op } = require("sequelize");
  
module.exports = class {
  
    async add(data){
      return await Product.create(data);
    }
  
    async getDetailByName(name){
      return await Product.findOne({where: { productName : name } })
    }

    async getDetailById(id){
      return await Product.findOne({where: { id } })
    }
  
    async list(data){
      let where = [];
  
      if(data.search) {
        data.search.forEach((searchData) =>{
          if(searchData.field === "price"){
            where.push({
              [searchData.field]: {
                [Op.between]: searchData.value,
              },
            })
          }
           else{
            where.push({
              [searchData.field]: {
                [Op.substring]: searchData.value,
              },
            })
           }
        });
      }
  
      const limit = parseInt(data.perPage || 10);
      const page = parseInt(data.pageNo || 1);
      const offset = (page - 1) * limit;
  
      const order = data.sort ? [[data.sort.field, data.sort.order]] : [["createdAt", "DESC"]];
  
      return await Product.findAndCountAll({where, distinct: true, limit, offset, order});
    }

    async updateById(params, id){
      await Product.update(params, {where: { id } });
    }
    
    async deleteById(id){
      await Product.destroy({ where: { id } });
    }
};
  