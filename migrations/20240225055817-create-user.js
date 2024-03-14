'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.INTEGER(2),
        comment: "Admin =>1 User =>2",
      },
      business_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
      },
      mobile_no:{
        type:Sequelize.STRING(12),
        allowNull:false,
      },
      country_id:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      state_id:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      city_id:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      pincode:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      resetToken: {
        type: Sequelize.STRING(255),
      },
      resetTokenExpiration: {
        type: Sequelize.DATE,
      },
      otp: {
        allowNull: true,
        type: Sequelize.INTEGER(6),
      },
      otpVerify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
