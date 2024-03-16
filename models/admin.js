'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    vendor_id: DataTypes.STRING,
    mobile:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    image:DataTypes.STRING,
    otp:DataTypes.INTEGER,
    otpVerify:DataTypes.BOOLEAN,
    resetToken:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    tableName:'admins'
  });
  return Admin;
};