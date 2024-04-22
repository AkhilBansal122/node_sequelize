'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255)
      },
      meta_title: {
        type: Sequelize.STRING(255)
      },
      meta_description: {
        type: Sequelize.STRING(255)
      },
      meta_keywords: {
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.INTEGER(1),
        comment:"1 for active 2 for inactive"
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
    await queryInterface.addIndex('sub_categories', ['category_id']);
    await queryInterface.addIndex('sub_categories', ['name']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sub_categories');
  }
};