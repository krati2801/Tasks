const Employee = require("../Database/Schemas").emp_details;
const { 
   emp_education_details : empEducationSchema
} = require("../Database/Schemas");

const { Op } = require("sequelize");

module.exports = class {

  async add(data){
    console.log("data", data)
    return await Employee.create(data)
  }

  async getDetailByEmailOrPhone(email, phone){
    return await Employee.findOne({where: { 
        [Op.or]: {
            email, 
            phone
        } 
    } })
  }

//   async list(data){
//     let attributes = this.attributes;
//     let where = [];

//     if(data.search) {
//       data.search.forEach((searchData) =>
//         where.push({
//           [searchData.field]: {
//             [Op.substring]: searchData.value,
//           },
//         })
//       );
//     }

//     const limit = parseInt(data.perPage || 10);
//     const page = parseInt(data.pageNo || 1);
//     const offset = (page - 1) * limit;

//     const order = data.sort ? [[data.sort.field, data.sort.order]] : [["createdAt", "DESC"]];

//     return await Topic.findAndCountAll({attributes, where, limit, offset, order});
//   }

//   async updateById(params, id){
//     await Topic.update(params, { where: { id } });
//   }

//   async deleteById(id){
//     await Topic.destroy({ where: { id } });
//   }
};
