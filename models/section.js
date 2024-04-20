'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Section.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    meta_title: DataTypes.STRING,
    meta_description: DataTypes.STRING,
    meta_keywords: DataTypes.STRING,
    status:DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"sections",
    modelName: 'Section',
    
  });
  return Section;
};