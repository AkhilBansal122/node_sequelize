'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255)
      },
      address: {
        type: Sequelize.TEXT
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      commision: {
        type: Sequelize.INTEGER
      },
      otp: {
        type: Sequelize.INTEGER
      },
      verify: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vendors');
  }
};