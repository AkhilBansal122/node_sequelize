'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      // Define associations here
      State.belongsTo(models.Country, { foreignKey: 'country_id' });
      State.hasMany(models.City, { foreignKey: 'state_id' });
    }
  }
  State.init({
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING(255),
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'State',
    tableName:'states'
  });
  return State;
};
