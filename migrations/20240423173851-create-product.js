'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      section_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      subcategory_id: {
        type: Sequelize.INTEGER
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      product_code: {
        type: Sequelize.STRING
      },
      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      main_image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER(1),
        comment: "1 for active, 2 for inactive"
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

    // Adding indexes
    await queryInterface.addIndex('products', ['brand_id']);
    await queryInterface.addIndex('products', ['section_id']);
    await queryInterface.addIndex('products', ['category_id']);
    await queryInterface.addIndex('products', ['subcategory_id']);
    await queryInterface.addIndex('products', ['vendor_id']);
    await queryInterface.addIndex('products', ['parent_id']);
    await queryInterface.addIndex('products', ['name']);
    await queryInterface.addIndex('products', ['product_code']);
    await queryInterface.addIndex('products', ['status']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
