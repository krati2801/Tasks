'use strict';
// PATH DATA OF WHERE TO STORE FILES
const { PATHS } = require("../../Configs/constants");
const { IMAGES } = PATHS;
const {
  Model
} = require('sequelize');
const fileManager = require("../../Managers/File.Manager")
module.exports = (sequelize, DataTypes) => {
  class emp_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emp_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING(50),
    middleName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    dateOfBirth: {
      type: DataTypes.DATEONLY
    },
    image: {
      type: DataTypes.STRING(150),
      get() {
        let image = this.getDataValue("image")
        return (image) ? fileManager.getUrl(IMAGES.ORIGINAL, image) : null
      }
    },
    presentAddress: DataTypes.STRING(150),
    permanentAddress: DataTypes.STRING(150),
    bankName: {
      type: DataTypes.STRING(150)
    },
    accountName: {
      type: DataTypes.STRING(150)
    },
    accountNumber: {
      type: DataTypes.BIGINT
    },
    IFSCCode: {
      type: DataTypes.STRING(20)
    },
    aadharNumber: {
      type: DataTypes.BIGINT
    },
    panNumber: {
      type: DataTypes.BIGINT
    },
  }, {
    sequelize,
    modelName: 'emp_details',
  });
  return emp_details;
};