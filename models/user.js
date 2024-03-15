'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define a one-to-many relationship: User has many Contacts
      User.hasMany(models.Contact, { foreignKey: 'userId' });

      // Define the reverse relationship: Contact belongs to a User
      models.Contact.belongsTo(User, { foreignKey: 'userId' });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,

    email: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    pincode: DataTypes.INTEGER,
    resetToken: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    otpVerify: DataTypes.BOOLEAN,
    resetTokenExpiration: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'User',
    tableName:"users"
  });

  return User;
};
