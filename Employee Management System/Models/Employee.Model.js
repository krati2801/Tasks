const { emp_details : Employee, emp_education_details : empEducationSchema, 
  emp_experience_details: empExperienceSchema, emp_organization_details: empOrganizationSchema, 
  emp_professional_details: empProfessionalSchema} = require("../Database/Schemas");

const { Op } = require("sequelize");

module.exports = class {

  async add(data){
    return await Employee.create(data,{
      include:[{
        as: 'education',
        model: empEducationSchema
      },{
        as: 'experience',
        model: empExperienceSchema
      },{
        as: 'professional',
        model: empProfessionalSchema
      },{
        as: 'organization',
        model: empOrganizationSchema
      }],
      logging: console.log
    })
  }

  async getDetailByEmailOrPhone(email, phone){
    return await Employee.findOne({where: { 
        [Op.or]: {
            email, 
            phone
        } 
    } })
  }

  async getDetailById(id){
    let include = [{
      as: 'education',
      model: empEducationSchema
    },{
      as: 'experience',
      model: empExperienceSchema
    },{
      as: 'professional',
      model: empProfessionalSchema
    },{
      as: 'organization',
      model: empOrganizationSchema
    }]
    return await Employee.findOne({include, where: { id } })
  }

  async list(data){
    
    let include = [{
      as: 'education',
      model: empEducationSchema
    },{
      as: 'experience',
      model: empExperienceSchema
    },{
      as: 'professional',
      model: empProfessionalSchema
    },{
      as: 'organization',
      model: empOrganizationSchema
    }]

    let where = [];

    if(data.search) {
      data.search.forEach((searchData) =>
        where.push({
          [searchData.field]: {
            [Op.substring]: searchData.value,
          },
        })
      );
    }

    const limit = parseInt(data.perPage || 10);
    const page = parseInt(data.pageNo || 1);
    const offset = (page - 1) * limit;

    const order = data.sort ? [[data.sort.field, data.sort.order]] : [["createdAt", "DESC"]];

    return await Employee.findAndCountAll({include, where, distinct: true, limit, offset, order});
  }

  async updateById(params, id){
    await Employee.update(params, {where: { id } });
  }

  async deleteById(id){
    await Employee.destroy({ where: { id } });
  }
};
