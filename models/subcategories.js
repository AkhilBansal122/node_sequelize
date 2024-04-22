// models/Subcategory.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      SubCategory.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
    }
  }
  SubCategory.init({
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING(255),
    meta_title: DataTypes.STRING(255),
    meta_description: DataTypes.STRING(255),
    meta_keywords: DataTypes.STRING(255),
    status: {
      type: DataTypes.INTEGER,
      comment: "1 for active, 2 for inactive"
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SubCategory',
    tableName: 'sub_categories' // Specify the table name if different from the model name
  });
  return SubCategory;
};
