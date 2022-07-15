'use strict';
const {
  Model
} = require('sequelize');
const { PATHS } = require("../../Configs/constants");
const { IMAGES } = PATHS;
const generalHelper = require("../../Helpers/General.Helper")
module.exports = (sequelize, DataTypes) => {
  class product_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_details.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    productName: DataTypes.STRING(150),
    productDescription: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
     image: {
      type: DataTypes.STRING(150),
      get() {
        let image = this.getDataValue("image")
        return (image) ? generalHelper.getUrl(IMAGES.ORIGINAL, image) :  generalHelper.getUrl(IMAGES.ORIGINAL, "default_product_1657605986885_90699.jpg")
      }
    },
  }, {
    sequelize,
    modelName: 'product_details',
  });
  return product_details;
};