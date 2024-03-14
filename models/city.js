'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // Define associations here
      City.belongsTo(models.Country, { foreignKey: 'country_id' });
      City.belongsTo(models.State, { foreignKey: 'state_id' });
    }
  }
  City.init({
    country_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    name: DataTypes.STRING(255),
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
