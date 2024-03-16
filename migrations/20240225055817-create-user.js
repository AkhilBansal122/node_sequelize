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
      mobile_no: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      otp: {
        allowNull: true,
        type: Sequelize.INTEGER(6),
      },
      otpVerify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      resetToken: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      resetTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.addIndex('users', ['first_name']);
    await queryInterface.addIndex('users', ['last_name']);
    await queryInterface.addIndex('users', ['mobile_no']);
    await queryInterface.addIndex('users', ['email']);


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};