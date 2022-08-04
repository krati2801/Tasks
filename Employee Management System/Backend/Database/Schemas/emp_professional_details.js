'use strict';
const { SKILLS, PATHS } = require("../../Configs/constants");
const { IMAGES } = PATHS;
const fileManager = require("../../Managers/File.Manager")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emp_professional_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.emp_details.hasMany(emp_professional_details, { as: "professional", foreignKey: "empId", onDelete: "CASCADE", onUpdate: "NO ACTION" })
      emp_professional_details.belongsTo(models.emp_details, {
        as: "professional",
        foreignKey: "empId",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    }
  }
  emp_professional_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    empId: {
      type: DataTypes.UUID,
    },
    designation: {
      type: DataTypes.STRING(150)
    },
    department: {
      type: DataTypes.STRING(150)
    },
    expInYears: {
      type: DataTypes.TINYINT
    },
    expInMonths: {
      type: DataTypes.TINYINT
    },
    currentLocation: {
      type: DataTypes.STRING
    },
    skills: {
      type: DataTypes.ENUM,
      values: [SKILLS.ANGULAR, SKILLS.NODE, SKILLS.REACT, SKILLS.VUE]
    },
    resume: {
      type: DataTypes.STRING(150),
      get() {
        let resume = this.getDataValue("resume")
        return (resume) ? fileManager.getUrl(IMAGES.ORIGINAL, resume) : null
      }
    },
  }, {
    sequelize,
    modelName: 'emp_professional_details',
  });
  return emp_professional_details;
};