'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER(2),
        comment: "1 for admin 2 for vendor 3 for subadmin"
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      mobile: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
      },
      image: {
        type: Sequelize.STRING(100),
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
//    await queryInterface.addIndex('admins', ['email']);
  //  await queryInterface.addIndex('admins', ['vendor_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admins');
  }
};