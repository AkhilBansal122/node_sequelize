'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      // Define associations here
      Country.hasMany(models.State, { foreignKey: 'country_id' });
      Country.hasMany(models.City, { foreignKey: 'country_id' });
    }
  }
  Country.init({
    name: DataTypes.STRING(100),
    country_code: DataTypes.STRING(2),
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Country',
    tableName:"countries"
  });
  return Country;
};
