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
    business_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
        type: DataTypes.INTEGER, 
    },
    country_id:DataTypes.INTEGER,
    state_id:DataTypes.INTEGER,
    city_id:DataTypes.INTEGER,
    pincode:DataTypes.INTEGER,
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_no_1:DataTypes.STRING,
    otp: {
        allowNull:true,
        type: DataTypes.INTEGER(6),
      },
      otpVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
