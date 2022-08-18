'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emp_experience_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.emp_details.hasMany(emp_experience_details, { as: "experience", foreignKey: "empId", onDelete: "CASCADE", onUpdate: "NO ACTION" })
      emp_experience_details.belongsTo(models.emp_details, {
        as: "experience",
        foreignKey: "empId",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    }
  }
  emp_experience_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    empId: {
      type: DataTypes.UUID,
    },
    companyName: {
      type: DataTypes.STRING(150)
    },
    position: {
      type: DataTypes.STRING(100)
    },
    totalYear: {
      type: DataTypes.FLOAT
    },
    lastCTC: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'emp_experience_details',
  });
  return emp_experience_details;
};