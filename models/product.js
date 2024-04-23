'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    brand_id: DataTypes.INTEGER,
    section_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    vendor_id: DataTypes.INTEGER,
    product_code: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    main_image: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'products',
    modelName: 'Product',
  });
  return Product;
};