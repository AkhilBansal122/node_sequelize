'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productsizeattribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productsizeattribute.belongsTo(models.Product, {
        foreignKey: 'product_id',

      });
      productsizeattribute.belongsTo(models.ProductColorAttribute, {
        foreignKey: 'color_id'
      });
    }
  }
  productsizeattribute.init({
    product_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    sale_price: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'productsizeattribute',
    tableName:"product_size_attributes"
  });
  return productsizeattribute;
};