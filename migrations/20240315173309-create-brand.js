'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      vendor_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255)
      },
      slug: {
        type: Sequelize.STRING(255)
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      image: {
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
        type: Sequelize.INTEGER,
        comment:"1 for active 2 for inactive",
        defaultValue:1
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
    await queryInterface.addIndex('brands', ['name']);
    await queryInterface.addIndex('brands', ['slug']);
    await queryInterface.addIndex('brands', ['meta_title']);
    await queryInterface.addIndex('brands', ['meta_description']);
    await queryInterface.addIndex('brands', ['meta_keywords']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('brands');
  }
};