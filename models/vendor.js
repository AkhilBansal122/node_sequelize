'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vendor.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
        as: 'admin', 
      });
      Vendor.belongsTo(models.State, {
        foreignKey: 'state_id',
        as: 'state', 
      });
      Vendor.belongsTo(models.Country, {
        foreignKey: 'country_id',
        as: 'country', 
      });
    }
  }
  Vendor.init({
    admin_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    state_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    city: DataTypes.STRING,
    pincode: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    commision: DataTypes.INTEGER,
    otp: DataTypes.INTEGER,
    verify: DataTypes.BOOLEAN,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};