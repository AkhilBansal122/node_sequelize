// models/category.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.Section, {
        foreignKey: 'section_id'
      });
    }
  }
  Category.init({
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    section_id: DataTypes.INTEGER,
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
    modelName: 'Category',
    tableName: 'categories' // Specify the table name if different from the model name
  });
  return Category;
};
