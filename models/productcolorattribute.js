'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductColorAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductColorAttribute.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  ProductColorAttribute.init({
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductColorAttribute',
    tableName:"product_color_attributes"
  });
  return ProductColorAttribute;
};