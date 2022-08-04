'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emp_organization_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.emp_details.hasMany(emp_organization_details, { as: "organization", foreignKey: "empId", onDelete: "CASCADE", onUpdate: "NO ACTION" })
      emp_organization_details.belongsTo(models.emp_details, {
        as: "organization",
        foreignKey: "empId",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    }
  }
  emp_organization_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    empId: {
      type: DataTypes.UUID,
    },
    joiningDate: {
      type: DataTypes.DATEONLY
    },
    nextAppraiselDate: {
      type: DataTypes.DATEONLY
    },
    currentCTC: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'emp_organization_details',
  });
  return emp_organization_details;
};