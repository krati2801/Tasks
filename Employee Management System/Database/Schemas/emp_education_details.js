'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emp_education_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.emp_details.hasMany(emp_education_details, { as: "education", foreignKey: "empId", onDelete: "CASCADE", onUpdate: "NO ACTION" })
      emp_education_details.belongsTo(models.emp_details, {
        as: "education",
        foreignKey: "empId",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    }
  }
  emp_education_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    empId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(150)
    },
    universityName: {
      type: DataTypes.STRING
    },
    result: {
      type: DataTypes.STRING
    },
    yearOfPassing: {
      type: DataTypes.SMALLINT
    },
  }, {
    sequelize,
    modelName: 'emp_education_details',
  });
  return emp_education_details;
};